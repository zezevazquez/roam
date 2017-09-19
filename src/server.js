const express = require('express')
const middleware = require('./server/middleware')
const routes = require('./server/routes/index')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use('/', middleware)
app.use('/', routes)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log('Listening on===port:', port)
})
