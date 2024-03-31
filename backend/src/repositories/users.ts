import { type Prisma, type User } from '@prisma/client'

interface UsersRepository {
  findByEmail: (email: string) => Promise<User | null>
  save: (data: Prisma.UserCreateInput) => Promise<User>
}

export type { UsersRepository }
