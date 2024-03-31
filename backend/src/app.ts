import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'
import { appRoutes } from '@/http/routes'
import { HttpStatusCode } from '@/http/utils'
import fastifyJwt from '@fastify/jwt'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(HttpStatusCode.BAD_REQUEST).send({
      message: 'Validation error.',
      issues: error.format()
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send({ message: 'Internal server error.' })
})

export { app }
