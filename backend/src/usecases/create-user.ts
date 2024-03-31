import { type HashProvider } from '@/providers'
import { type UsersRepository } from '@/repositories'
import { UserAlreadyExistsError } from '@/usecases/errors'
import { type User } from '@prisma/client'

interface CreateUserUseCaseRequest {
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider
  ) {}

  async execute({ email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await this.hashProvider.encryptPassword(password)

    const user = await this.usersRepository.save({
      email,
      password: hashedPassword
    })

    return {
      user
    }
  }
}

export { CreateUserUseCase }
