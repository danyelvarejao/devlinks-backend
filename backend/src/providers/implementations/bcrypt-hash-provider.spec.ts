import { describe, expect, it } from 'vitest'

import { BCryptHashProvider } from '@/providers/implementations/bcrypt-hash-provider'

describe('BCryptHashProvider', () => {
  it('should hash password', async () => {
    const bcryptHashProvider = new BCryptHashProvider()

    const password = '123456'

    const hashedPassword = await bcryptHashProvider.encryptPassword(password)

    expect(hashedPassword).not.toEqual(password)
  })

  it('should compare password with hashed password', async () => {
    const bcryptHashProvider = new BCryptHashProvider()

    const password = '123456'

    const hashedPassword = await bcryptHashProvider.encryptPassword(password)

    const isMatch = await bcryptHashProvider.comparePassword(password, hashedPassword)

    expect(isMatch).toBe(true)
  })
})
