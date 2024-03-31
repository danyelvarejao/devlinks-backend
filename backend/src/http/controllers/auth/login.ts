import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

import { HttpStatusCode } from '@/http/utils'
import { InvalidCredentialsError } from '@/usecases/errors'
import { makeLoginUseCase } from '@/usecases/factories'

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32)
})

const login = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { email, password } = loginBodySchema.parse(request.body)

  try {
    const loginUseCase = makeLoginUseCase()

    const { user } = await loginUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id
        }
      }
    )

    return reply.status(HttpStatusCode.OK).send({
      token
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(HttpStatusCode.BAD_REQUEST).send({ message: error.message })
    }

    throw error
  }
}

export { login }
