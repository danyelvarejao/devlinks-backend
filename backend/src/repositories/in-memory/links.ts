import { type Prisma, type Link } from '@prisma/client'

import { type LinksRepository } from '@/repositories'

class InMemoryLinksRepository implements LinksRepository {
  public links: Link[] = []

  async findManyByUserId(userId: string): Promise<Link[]> {
    const links = this.links.filter(link => link.user_id === userId)

    return links
  }

  async save(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
    const link: Link = {
      id: data.id ?? crypto.randomUUID(),
      link: data.link,
      platform: data.platform,
      user_id: data.user_id
    }

    this.links.push(link)

    return link
  }
}

export { InMemoryLinksRepository }
