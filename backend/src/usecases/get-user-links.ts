import { type LinksRepository } from '@/repositories'
import { type Link } from '@prisma/client'

interface GetUserLinksUseCaseRequest {
  userId: string
}

interface GetUserLinksUseCaseResponse {
  links: Link[]
}

class GetUserLinksUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}

  async execute({ userId }: GetUserLinksUseCaseRequest): Promise<GetUserLinksUseCaseResponse> {
    const links = await this.linksRepository.findManyByUserId(userId)

    return {
      links
    }
  }
}

export { GetUserLinksUseCase }
