import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

import { HttpStatusCode } from '@/http/utils'
import { UserAlreadyExistsError } from '@/usecases/errors'
import { makeCreateUserUseCase } from '@/usecases/factories/make-create-user-usecase'

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32)
})

const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { email, password } = createUserBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({ email, password })

    return reply.status(HttpStatusCode.CREATED).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply
        .status(HttpStatusCode.CONFLICT)
        .send({ message: error.message })
    }

    throw error
  }
}

export { createUser }
