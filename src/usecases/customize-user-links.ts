import { type Prisma } from '@prisma/client'

import { type LinksRepository } from '@/repositories'
import { MaxLinksExceededError } from '@/usecases/errors'

interface CustomizeUserLinksUseCaseRequest {
  userId: string
  links: Prisma.LinkCreateWithoutUserInput[]
}

class CustomizeUserLinksUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}

  async execute({
    userId,
    links
  }: CustomizeUserLinksUseCaseRequest): Promise<void> {
    const MAX_LINKS = 5
    if (links.length > MAX_LINKS) {
      throw new MaxLinksExceededError()
    }

    await this.linksRepository.deleteAllByUserId(userId)

    await this.linksRepository.saveMany(userId, links)
  }
}

export { CustomizeUserLinksUseCase }
