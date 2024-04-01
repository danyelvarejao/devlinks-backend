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

  async save(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
    const link = await prisma.link.create({
      data
    })

    return link
  }
}

export { PrismaLinksRepository }
