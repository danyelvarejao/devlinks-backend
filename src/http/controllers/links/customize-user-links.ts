import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

import { HttpStatusCode } from '@/http/utils'
import { InvalidLinkURL, MaxLinksExceededError } from '@/usecases/errors'
import { makeCustomizeUserLinksUseCase } from '@/usecases/factories'

const customizeUserLinksBodySchema = z.object({
  links: z.array(
    z.object({
      platform: z.enum([
        'GITHUB',
        'FRONTENDMENTOR',
        'TWITTER',
        'LINKEDIN',
        'YOUTUBE',
        'FACEBOOK',
        'TWITCH',
        'DEVTO',
        'CODEWARS',
        'CODEPEN',
        'FREECODECAMP',
        'GITLAB',
        'HASHNODE',
        'STACKOVERFLOW'
      ]),
      link: z.string().url(),
      order: z.number()
    })
  )
})

const customizeUserLinks = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { links } = customizeUserLinksBodySchema.parse(request.body)

  const customiseUserLinksUseCase = makeCustomizeUserLinksUseCase()

  try {
    await customiseUserLinksUseCase.execute({
      userId: request.user.sub,
      links
    })
  } catch (error) {
    if (
      error instanceof MaxLinksExceededError ||
      error instanceof InvalidLinkURL
    ) {
      return reply.status(HttpStatusCode.BAD_REQUEST).send({
        message: error.message
      })
    }
  }

  return reply.status(HttpStatusCode.NO_CONTENT).send()
}

export { customizeUserLinks }
