import { app } from '@/app'
import { env } from '@/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT
  })
  .then(() => {
    console.log(`✅ Server is running on PORT ${env.PORT}`)
  })
  .catch(error => {
    console.error('❌ Error occurred while starting the server:', error)
  })
