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

    await linksRepository.save({
      link: 'any-github-link',
      platform: 'GITHUB',
      user_id: user.id
    })
    await linksRepository.save({
      link: 'any-devto-link',
      platform: 'DEVTO',
      user_id: user.id
    })
    await linksRepository.save({
      link: 'any-codepen-link',
      platform: 'CODEPEN',
      user_id: user.id
    })

    const { links } = await sut.execute({
      userId: user.id
    })

    expect(links[0].id).toEqual(expect.any(String))
    expect(links).toHaveLength(3)
  })
})
