import { type FastifyInstance } from 'fastify'
import request from 'supertest'

interface CreateAndLoginUserOutput {
  token: string
}

const createAndLoginUser = async (
  app: FastifyInstance
): Promise<CreateAndLoginUserOutput> => {
  await request(app.server).post('/users').send({
    email: 'test@test.com',
    password: '123456'
  })

  const loginResponse = await request(app.server).post('/login').send({
    email: 'test@test.com',
    password: '123456'
  })

  const { token } = loginResponse.body

  return {
    token
  }
}

export { createAndLoginUser }
