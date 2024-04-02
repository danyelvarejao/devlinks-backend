import { it, describe, beforeEach, expect } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import {
  InMemoryLinksRepository,
  InMemoryUsersRepository
} from '@/repositories/in-memory'
import { GetUserLinksUseCase } from '@/usecases/get-user-links'

let linksRepository: InMemoryLinksRepository
let usersRepository: InMemoryUsersRepository
let hashProvider: BCryptHashProvider
let sut: GetUserLinksUseCase

describe('GetUserLinksUseCase', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new BCryptHashProvider()
    sut = new GetUserLinksUseCase(linksRepository)
  })

  it('should be able to get user links', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    const user = await usersRepository.save({
      email: 'any-email',
      password: hashedPassword
    })

    await linksRepository.saveMany(user.id, [
      { link: 'any-github-link', platform: 'GITHUB', order: 1 },
      { link: 'any-codepen-link', platform: 'CODEPEN', order: 3 },
      { link: 'any-codewars-link', platform: 'CODEWARS', order: 2 },
      { link: 'any-devto-link', platform: 'DEVTO', order: 5 },
      { link: 'any-facebook-link', platform: 'FACEBOOK', order: 4 }
    ])

    const { links } = await sut.execute({
      userId: user.id
    })

    expect(links[0].id).toEqual(expect.any(String))
    expect(links).toHaveLength(5)
  })
})
