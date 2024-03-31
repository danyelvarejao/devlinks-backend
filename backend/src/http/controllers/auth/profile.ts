import { type FastifyReply, type FastifyRequest } from 'fastify'

import { HttpStatusCode } from '@/http/utils'
import { makeGetUserProfileUseCase } from '@/usecases/factories'

const profile = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub
  })

  return reply.status(HttpStatusCode.OK).send({
    user: {
      ...user,
      password: undefined
    }
  })
}

export { profile }
