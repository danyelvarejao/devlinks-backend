import { type FastifyReply, type FastifyRequest } from 'fastify'

import { HttpStatusCode } from '@/http/utils'

const verifyJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(HttpStatusCode.UNAUTHORIZED).send({
      message: 'Unauthorized.'
    })
  }
}

export { verifyJWT }
