import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { app } from '@/app'
import { HttpStatusCode } from '@/http/utils'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      email: 'any-email@email.com',
      password: '123456'
    })

    const loginResponse = await request(app.server).post('/login').send({
      email: 'any-email@email.com',
      password: '123456'
    })

    const { token } = loginResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(HttpStatusCode.OK)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'any-email@email.com'
      })
    )
  })
})
