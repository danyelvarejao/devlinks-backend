import { type HashProvider } from '@/providers'
import { type UsersRepository } from '@/repositories'
import { UserAlreadyExistsError } from '@/usecases/errors'

interface CreateUserUseCaseRequest {
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  id?: string
  email: string
  firstName: string | null
  lastName: string | null
  image: string | null
  createdAt: Date
  updatedAt: Date
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
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      image: user.image,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  }
}

export { CreateUserUseCase }
