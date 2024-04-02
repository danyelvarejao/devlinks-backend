import { type Prisma, type Link } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { type LinksRepository } from '@/repositories'

class PrismaLinksRepository implements LinksRepository {
  async findManyByUserId(userId: string): Promise<Link[]> {
    const links = await prisma.link.findMany({
      where: {
        user_id: userId
      }
    })

    return links
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await prisma.link.deleteMany({
      where: {
        user_id: userId
      }
    })
  }

  async saveMany(
    userId: string,
    links: Prisma.LinkCreateWithoutUserInput[]
  ): Promise<void> {
    const linksWithUserId = links.map(link => ({
      ...link,
      user_id: userId
    }))

    await prisma.link.createMany({
      data: linksWithUserId
    })
  }
}

export { PrismaLinksRepository }
