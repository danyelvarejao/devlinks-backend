import { type Prisma, type Link } from '@prisma/client'

import { type LinksRepository } from '@/repositories'

class InMemoryLinksRepository implements LinksRepository {
  public links: Link[] = []

  async findManyByUserId(userId: string): Promise<Link[]> {
    const links = this.links.filter(link => link.user_id === userId)

    return links
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    this.links = this.links.filter(link => link.user_id !== userId)
  }

  async saveMany(
    userId: string,
    links: Prisma.LinkCreateWithoutUserInput[]
  ): Promise<void> {
    const linksWithUserId = links.map(link => ({
      ...link,
      id: link.id ?? crypto.randomUUID(),
      user_id: userId
    }))

    this.links.push(...linksWithUserId)
  }
}

export { InMemoryLinksRepository }
