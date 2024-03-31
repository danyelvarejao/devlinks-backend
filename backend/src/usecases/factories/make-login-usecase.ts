import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { PrismaUsersRepository } from '@/repositories/prisma'
import { LoginUseCase } from '@/usecases'

const makeLoginUseCase = (): LoginUseCase => {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()
  const loginUseCase = new LoginUseCase(usersRepository, hashProvider)

  return loginUseCase
}

export { makeLoginUseCase }
