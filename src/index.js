require('dotenv').config()
const path = require('path')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const { notFound, productionErrors } = require('./middleware/errors')
const db = require('./models')
db.sync()

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  process.env.SCHEME_AND_HOST = `${req.protocol}://${req.get('host')}`
  next()
})

app.use(cors())

app.use(require('./routes'))
app.get('/', (req, res) => res.redirect('/api-docs'))


app.use(notFound)


const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'start') {
    console.log(`==========conectando a ============ http://localhost:${PORT}`)
  }
})

module.exports = {
  app,
  server,
}
