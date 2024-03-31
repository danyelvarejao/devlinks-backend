import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { app } from '@/app'
import { HttpStatusCode } from '@/http/utils'

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {
    const response = await request(app.server).post('/users').send({
      email: 'any-email@email.com',
      password: '123456'
    })

    expect(response.statusCode).toEqual(HttpStatusCode.CREATED)
  })
})
