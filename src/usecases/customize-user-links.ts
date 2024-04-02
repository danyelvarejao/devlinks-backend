import { type Prisma } from '@prisma/client'

import { type LinksRepository } from '@/repositories'
import { InvalidLinkURL, MaxLinksExceededError } from '@/usecases/errors'

const VALID_URLS = {
  GITHUB: 'https://github.com',
  FRONTENDMENTOR: 'https://www.frontendmentor.io',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://www.linkedin.com',
  YOUTUBE: 'https://youtube.com',
  FACEBOOK: 'https://www.facebook.com',
  TWITCH: 'https://www.twitch.tv',
  DEVTO: 'https://dev.to',
  CODEWARS: 'https://www.codewars.com',
  CODEPEN: 'https://codepen.io',
  FREECODECAMP: 'https://www.freecodecamp.org',
  GITLAB: 'https://gitlab.com',
  HASHNODE: 'https://hashnode.com',
  STACKOVERFLOW: 'https://stackoverflow.com'
}

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

    for (const data of links) {
      if (!data.link.startsWith(VALID_URLS[data.platform])) {
        throw new InvalidLinkURL(data.platform)
      }
    }

    await this.linksRepository.deleteAllByUserId(userId)

    await this.linksRepository.saveMany(userId, links)
  }
}

export { CustomizeUserLinksUseCase }
