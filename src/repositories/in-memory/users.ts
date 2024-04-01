import { type User, type Prisma } from '@prisma/client'

import { type UsersRepository } from '@/repositories'

class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(item => item.id === id)
    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(item => item.email === email)
    if (!user) {
      return null
    }

    return user
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: data.id ?? crypto.randomUUID(),
      email: data.email,
      password: data.password,
      first_name: data.first_name ?? null,
      last_name: data.last_name ?? null,
      image: data.image ?? null,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(user)

    return user
  }
}

export { InMemoryUsersRepository }
