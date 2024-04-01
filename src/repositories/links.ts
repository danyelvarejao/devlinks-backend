import { type Prisma, type Link } from '@prisma/client'

interface LinksRepository {
  findManyByUserId: (userId: string) => Promise<Link[]>
  save: (data: Prisma.LinkUncheckedCreateInput) => Promise<Link>
}

export type { LinksRepository }
