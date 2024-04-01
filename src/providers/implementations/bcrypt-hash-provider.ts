import { compare, hash } from 'bcrypt'

import { type HashProvider } from '@/providers'

class BCryptHashProvider implements HashProvider {
  async encryptPassword(password: string): Promise<string> {
    return await hash(password, 6)
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword)
  }
}

export { BCryptHashProvider }
