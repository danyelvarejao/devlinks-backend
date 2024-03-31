import { type FastifyInstance } from 'fastify'

import { login } from '@/http/controllers/auth'

const authRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/login', login)
}

export { authRoutes }
