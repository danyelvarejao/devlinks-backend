import { type FastifyInstance } from 'fastify'

import { customizeUserLinks, getUserLinks } from '@/http/controllers/links'
import { verifyJWT } from '@/http/middlewares'

const linksRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/links', { onRequest: [verifyJWT] }, customizeUserLinks)
  app.get('/links/:userId', getUserLinks)
}

export { linksRoutes }
