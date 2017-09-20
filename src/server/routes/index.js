const router = require('express').Router()
const { signupUser, loginUser, userProfile } = require('../../models/users')


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
    .then((userObj) => {
      res.redirect(`/users/${userObj.id}`)
    })
  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  return loginUser(email, password)
  .then((user) => {
    if (user === false) {
      res.render('login', {error: 'Incorrect login info'})
    } else {
      req.session.name = user.id
      res.redirect(`/users/${user.id}`)
    }
  })
})

router.get('/users/:id', (req, res) => {
  userId = req.params.id
  return userProfile(userId)
  .then((user) => {
    res.render('profile', {user, edit: false})
  })
})

router.get('/users/edit/:id', (req, res) => {
  userId = req.params.id
  return userProfile(userId)
  .then((user) => {
    res.render('profile', {user, edit: true})
  })
})

router.post('/users/edit/:id', (req, res) => {
  userId = req.params.id
  return userProfile(userId)
  .then((user) => {
    res.render('profile', {user})
  })
})
module.exports = router
