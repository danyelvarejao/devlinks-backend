import { beforeEach, describe, expect, it } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { LoginUseCase } from '@/usecases'
import { InvalidCredentialsError } from '@/usecases/errors'

let usersRepository: InMemoryUsersRepository
let hashProvider: BCryptHashProvider
let sut: LoginUseCase

describe('LoginUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new BCryptHashProvider()
    sut = new LoginUseCase(usersRepository, hashProvider)
  })

  it('should be able to login', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    await usersRepository.save({
      email: 'any-email@example.com',
      password: hashedPassword
    })

    const { user } = await sut.execute({
      email: 'any-email@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to login with wrong email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'any-email@example.com',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to login with wrong password', async () => {
    const hashedPassword = await hashProvider.encryptPassword('123456')

    await usersRepository.save({
      email: 'any-email@example.com',
      password: hashedPassword
    })

    await expect(async () => {
      await sut.execute({
        email: 'any-email@example.com',
        password: 'wrong-password'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
