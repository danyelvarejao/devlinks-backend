import { type User } from '@prisma/client'

import { type UsersRepository } from '@/repositories'
import { ResourceNotFoundError } from '@/usecases/errors'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userId
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}

export { GetUserProfileUseCase }
