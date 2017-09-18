const express = require('express')
const app = express()

//serve static files
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// use middleware
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('splash')
})

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log('Listening on===port:', port)
})
