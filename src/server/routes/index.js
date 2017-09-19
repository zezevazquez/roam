const router = require('express').Router()
const { signupUser } = require('../../models/users')


router.get('/', (req, res) => {
  res.render('splash')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const { email, password, confirm_password } = req.body

  if (password !== confirm_password) {
    res.render('signup', {error: 'Passwords don\'t match'})
  } else {
    signupUser(email, password)
    .then(() => {
      res.redirect('/users/:id')
    })

  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  res.render('login')
})

router.get('/users/:id', (req, res) => {
  contactId = req.params.id
  res.render('profile')
})

module.exports = router
