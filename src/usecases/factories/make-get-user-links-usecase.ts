import { PrismaLinksRepository } from '@/repositories/prisma'
import { GetUserLinksUseCase } from '@/usecases'

const makeGetUserLinksUseCase = (): GetUserLinksUseCase => {
  const linksRepository = new PrismaLinksRepository()
  const getUserLinksUseCase = new GetUserLinksUseCase(linksRepository)

  return getUserLinksUseCase
}

export { makeGetUserLinksUseCase }
