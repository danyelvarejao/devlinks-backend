import { type Prisma } from '@prisma/client'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

import { app } from '@/app'
import { HttpStatusCode } from '@/http/utils'
import { createAndLoginUser } from '@/utils/test'

describe('Customize User Links (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to customize user links', async () => {
    const { token } = await createAndLoginUser(app)

    const links: Prisma.LinkCreateWithoutUserInput[] = [
      { link: 'https://github.com/github', platform: 'GITHUB', order: 1 },
      { link: 'https://codepen.io/codepen', platform: 'CODEPEN', order: 3 },
      { link: 'https://www.codewars.com', platform: 'CODEWARS', order: 2 },
      { link: 'https://dev.to/devto', platform: 'DEVTO', order: 5 },
      { link: 'https://www.facebook.com', platform: 'FACEBOOK', order: 4 }
    ]

    const response = await request(app.server)
      .post('/links')
      .set('Authorization', `Bearer ${token}`)
      .send({
        links
      })

    expect(response.statusCode).toEqual(HttpStatusCode.NO_CONTENT)
  })
})
