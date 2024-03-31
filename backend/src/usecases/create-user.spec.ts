import { expect, describe, it, beforeEach } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { CreateUserUseCase } from '@/usecases'
import { UserAlreadyExistsError } from '@/usecases/errors'

let usersRepository: InMemoryUsersRepository
let hashProvider: BCryptHashProvider
let sut: CreateUserUseCase

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new BCryptHashProvider()
    sut = new CreateUserUseCase(usersRepository, hashProvider)
  })

  it('should create a new user successfully', async () => {
    const { user } = await sut.execute({
      email: 'any-email@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should return a hashed password when creating user', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      email: 'any-email@example.com',
      password
    })

    const isPasswordCorrectlyHashed = await hashProvider.comparePassword(password, user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should throw UserAlreadyExistsError when user with same email already exists', async () => {
    const email = 'any-email@example.com'

    await sut.execute({
      email,
      password: '123456'
    })

    await expect(async () => {
      await sut.execute({
        email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
