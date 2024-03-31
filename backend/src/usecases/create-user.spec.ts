import { expect, describe, it } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { CreateUserUseCase } from '@/usecases'
import { UserAlreadyExistsError } from '@/usecases/errors'

describe('CreateUserUseCase', () => {
  it('should create a new user successfully', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const hashProvider = new BCryptHashProvider()
    const sut = new CreateUserUseCase(usersRepository, hashProvider)

    const { user } = await sut.execute({
      email: 'any-email@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should return a hashed password when creating user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const hashProvider = new BCryptHashProvider()
    const sut = new CreateUserUseCase(usersRepository, hashProvider)

    const password = '123456'

    const { user } = await sut.execute({
      email: 'any-email@example.com',
      password
    })

    const isPasswordCorrectlyHashed = await hashProvider.comparePassword(password, user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should throw UserAlreadyExistsError when user with same email already exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const hashProvider = new BCryptHashProvider()
    const sut = new CreateUserUseCase(usersRepository, hashProvider)

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
