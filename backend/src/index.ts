import express from 'express'

const app = express()

app.get('/', (request, response) => {
  const message = 'Hello World'

  return response.json({ message })
})

app.listen(3333, () => {
  console.log(`Server running 💚`)
})
