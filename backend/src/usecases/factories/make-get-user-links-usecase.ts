import { PrismaLinksRepository } from '@/repositories/prisma/links'
import { GetUserLinksUseCase } from '@/usecases/get-user-links'

const makeGetUserLinksUseCase = (): GetUserLinksUseCase => {
  const linksRepository = new PrismaLinksRepository()
  const getUserLinksUseCase = new GetUserLinksUseCase(linksRepository)

  return getUserLinksUseCase
}

export { makeGetUserLinksUseCase }
