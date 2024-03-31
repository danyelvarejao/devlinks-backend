import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string()
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('Invalid environment variables.', result.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = result.data
