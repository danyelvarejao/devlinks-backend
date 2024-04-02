import { type Prisma, type Link } from '@prisma/client'

interface LinksRepository {
  findManyByUserId: (userId: string) => Promise<Link[]>
  deleteAllByUserId: (userId: string) => Promise<void>
  saveMany: (
    userId: string,
    links: Prisma.LinkCreateWithoutUserInput[]
  ) => Promise<void>
}

export type { LinksRepository }
