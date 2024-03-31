import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

import { HttpStatusCode } from '@/http/utils'
import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'
import { PrismaUsersRepository } from '@/repositories/prisma/users'
import { CreateUserUseCase } from '@/usecases/create-user'
import { UserAlreadyExistsError } from '@/usecases/errors'

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32)
})

const createUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { email, password } = createUserBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const hashProvider = new BCryptHashProvider()
    const createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider)

    await createUserUseCase.execute({ email, password })

    return reply.status(HttpStatusCode.CREATED).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(HttpStatusCode.CONFLICT).send({ message: error.message })
    }

    throw error
  }
}

export { createUser }
