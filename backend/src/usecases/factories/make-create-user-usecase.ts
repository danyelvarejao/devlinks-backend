import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { PrismaUsersRepository } from '@/repositories/prisma'
import { CreateUserUseCase } from '@/usecases'

const makeCreateUserUseCase = (): CreateUserUseCase => {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()
  const createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider)

  return createUserUseCase
}

export { makeCreateUserUseCase }
