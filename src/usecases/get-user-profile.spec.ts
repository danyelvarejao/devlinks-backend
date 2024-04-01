import { it, describe, beforeEach, expect } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { GetUserProfileUseCase } from '@/usecases'
import { ResourceNotFoundError } from '@/usecases/errors'

let usersRepository: InMemoryUsersRepository
let hashProvider: BCryptHashProvider
let sut: GetUserProfileUseCase

describe('GetUserProfileUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new BCryptHashProvider()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    const createdUser = await usersRepository.save({
      email: 'any-email',
      password: hashedPassword
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('any-email')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'wrong-id'
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
