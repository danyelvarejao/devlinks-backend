import { type FastifyInstance } from 'fastify'

import { authRoutes } from '@/http/routes/auth'
import { usersRoutes } from '@/http/routes/users'

const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.register(usersRoutes)
  app.register(authRoutes)
}

export { appRoutes }
