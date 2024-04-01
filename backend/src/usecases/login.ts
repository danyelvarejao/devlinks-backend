import { type User } from '@prisma/client'

import { type HashProvider } from '@/providers'
import { type UsersRepository } from '@/repositories'
import { InvalidCredentialsError } from '@/usecases/errors'

interface LoginUseCaseRequest {
  email: string
  password: string
}

interface LoginUseCaseResponse {
  user: User
}

class LoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider
  ) {}

  async execute({
    email,
    password
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isCorrectPassword = await this.hashProvider.comparePassword(
      password,
      user.password
    )
    if (!isCorrectPassword) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}

export { LoginUseCase }
