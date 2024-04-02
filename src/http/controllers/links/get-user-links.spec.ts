import { type Prisma } from '@prisma/client'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { app } from '@/app'
import { HttpStatusCode } from '@/http/utils'
import { createAndLoginUser } from '@/utils/test'

describe('Get User Links (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user links', async () => {
    const { token } = await createAndLoginUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const links: Prisma.LinkCreateWithoutUserInput[] = [
      { link: 'https://github.com/github', platform: 'GITHUB', order: 1 },
      { link: 'https://codepen.io/codepen', platform: 'CODEPEN', order: 3 },
      { link: 'https://www.codewars.com', platform: 'CODEWARS', order: 2 },
      { link: 'https://dev.to/devto', platform: 'DEVTO', order: 5 },
      { link: 'https://www.facebook.com', platform: 'FACEBOOK', order: 4 }
    ]

    await request(app.server)
      .post('/links')
      .set('Authorization', `Bearer ${token}`)
      .send({
        links
      })

    const userId = profileResponse.body.user.id

    const response = await request(app.server).get(`/links/${userId}`)

    expect(response.statusCode).toEqual(HttpStatusCode.OK)
    expect(response.body.links).toHaveLength(5)
  })
})
