import { type FastifyInstance } from 'fastify'

import { usersRoutes } from '@/http/routes/users'

const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.register(usersRoutes)
}

export { appRoutes }
