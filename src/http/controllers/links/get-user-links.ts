import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

import { HttpStatusCode } from '@/http/utils'
import { makeGetUserLinksUseCase } from '@/usecases/factories'

const getUserLinksParamsSchema = z.object({
  userId: z.string().uuid()
})

const getUserLinks = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = getUserLinksParamsSchema.parse(request.params)

  const getUserLinksUseCase = makeGetUserLinksUseCase()

  const { links } = await getUserLinksUseCase.execute({ userId })

  const linksWithoutUserId = links.map(({ user_id, ...rest }) => rest)

  return reply.status(HttpStatusCode.OK).send({
    links: linksWithoutUserId
  })
}

export { getUserLinks }
