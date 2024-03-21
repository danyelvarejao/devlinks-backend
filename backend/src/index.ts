import fastify from 'fastify'

const app = fastify({ logger: true })
const port = 3000

app.get('/', () => {
  return { message: 'Hello World' }
})

app.listen({ port }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
