import { type Prisma } from '@prisma/client'
import { it, describe, beforeEach, expect } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import {
  InMemoryLinksRepository,
  InMemoryUsersRepository
} from '@/repositories/in-memory'
import { CustomizeUserLinksUseCase } from '@/usecases'
import { InvalidLinkURL, MaxLinksExceededError } from '@/usecases/errors'

let linksRepository: InMemoryLinksRepository
let usersRepository: InMemoryUsersRepository
let hashProvider: BCryptHashProvider
let sut: CustomizeUserLinksUseCase

describe('CustomizeUserLinksUseCase', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new BCryptHashProvider()
    sut = new CustomizeUserLinksUseCase(linksRepository)
  })

  it('should be able to customize user links', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    const user = await usersRepository.save({
      email: 'any-email',
      password: hashedPassword
    })

    const links: Prisma.LinkCreateWithoutUserInput[] = [
      { link: 'https://github.com/github', platform: 'GITHUB', order: 1 },
      { link: 'https://codepen.io/codepen', platform: 'CODEPEN', order: 3 },
      { link: 'https://www.codewars.com', platform: 'CODEWARS', order: 2 },
      { link: 'https://dev.to/devto', platform: 'DEVTO', order: 5 },
      { link: 'https://www.facebook.com', platform: 'FACEBOOK', order: 4 }
    ]

    await sut.execute({
      userId: user.id,
      links
    })

    expect(linksRepository.links[0].id).toEqual(expect.any(String))
    expect(linksRepository.links).toHaveLength(5)
  })

  it('should not be able to customize more than 5 links', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    const user = await usersRepository.save({
      email: 'any-email',
      password: hashedPassword
    })

    const links: Prisma.LinkCreateWithoutUserInput[] = [
      { link: 'https://github.com/github', platform: 'GITHUB', order: 1 },
      { link: 'https://codepen.io/codepen', platform: 'CODEPEN', order: 3 },
      { link: 'https://www.codewars.com', platform: 'CODEWARS', order: 2 },
      { link: 'https://dev.to/devto', platform: 'DEVTO', order: 5 },
      { link: 'https://www.facebook.com', platform: 'FACEBOOK', order: 4 },
      { link: 'https://gitlab.com', platform: 'GITLAB', order: 6 },
      { link: 'https://www.twitch.tv', platform: 'TWITCH', order: 7 }
    ]

    await expect(async () => {
      await sut.execute({
        userId: user.id,
        links
      })
    }).rejects.toBeInstanceOf(MaxLinksExceededError)
  })

  it('should not be able to customize a link with an invalid url', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    const user = await usersRepository.save({
      email: 'any-email',
      password: hashedPassword
    })

    const links: Prisma.LinkCreateWithoutUserInput[] = [
      { link: 'invalid-link', platform: 'GITHUB', order: 1 },
      { link: 'invalid-link', platform: 'CODEPEN', order: 3 },
      { link: 'invalid-link', platform: 'CODEWARS', order: 2 }
    ]

    await expect(async () => {
      await sut.execute({
        userId: user.id,
        links
      })
    }).rejects.toBeInstanceOf(InvalidLinkURL)
  })
})
