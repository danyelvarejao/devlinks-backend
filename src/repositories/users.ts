import { type Prisma, type User } from '@prisma/client'

interface UsersRepository {
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  save: (data: Prisma.UserCreateInput) => Promise<User>
}

export type { UsersRepository }
