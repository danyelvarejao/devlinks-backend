import { type FastifyInstance } from 'fastify'

import { login, profile } from '@/http/controllers/auth'
import { verifyJWT } from '@/http/middlewares'

const authRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/login', login)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

export { authRoutes }
