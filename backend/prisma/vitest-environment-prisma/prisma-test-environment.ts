import { type Environment } from 'vitest'

const environment: Environment = {
  name: 'prisma',
  transformMode: 'web',

  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      }
    }
  }
}

export default environment
