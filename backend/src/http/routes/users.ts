import { type FastifyInstance } from 'fastify'

import { createUser } from '@/http/controllers/users'

const usersRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', createUser)
}

export { usersRoutes }
