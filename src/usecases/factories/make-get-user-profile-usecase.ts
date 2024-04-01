import { PrismaUsersRepository } from '@/repositories/prisma'
import { GetUserProfileUseCase } from '@/usecases'

const makeGetUserProfileUseCase = (): GetUserProfileUseCase => {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}

export { makeGetUserProfileUseCase }
