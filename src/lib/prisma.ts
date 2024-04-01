import { PrismaClient } from '@prisma/client'

import { env } from '@/env'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : []
})

export { prisma }
