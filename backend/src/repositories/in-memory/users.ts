import { type UsersRepository } from '@/repositories'
import { type User, type Prisma } from '@prisma/client'

class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

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
