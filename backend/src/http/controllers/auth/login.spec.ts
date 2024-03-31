import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { app } from '@/app'
import { HttpStatusCode } from '@/http/utils'

describe('Login (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to login', async () => {
    await request(app.server).post('/users').send({
      email: 'any-email@email.com',
      password: '123456'
    })

    const response = await request(app.server).post('/login').send({
      email: 'any-email@email.com',
      password: '123456'
    })

    expect(response.statusCode).toEqual(HttpStatusCode.OK)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})
