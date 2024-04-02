import { PrismaLinksRepository } from '@/repositories/prisma'
import { CustomizeUserLinksUseCase } from '@/usecases'

const makeCustomizeUserLinksUseCase = (): CustomizeUserLinksUseCase => {
  const linksRepository = new PrismaLinksRepository()
  const customizeUserLinksUseCase = new CustomizeUserLinksUseCase(
    linksRepository
  )

  return customizeUserLinksUseCase
}

export { makeCustomizeUserLinksUseCase }
