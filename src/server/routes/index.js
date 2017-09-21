const router = require('express').Router()
const { signupUser, loginUser, userProfile, updateUser, userPost, findPost } = require('../../models/users')


router.get('/', (req, res) => {
  console.log(req.session.user)
  res.render('splash', {user: req.session.user})
})

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.session.user || null, message: '' })
})

router.post('/signup', (req, res) => {
  const { email, password, confirm_password } = req.body
  if (password !== confirm_password) {
    res.render('signup', {error: 'Passwords don\'t match'})
  } else {
    signupUser(email, password)
    .then((userObj) => {
      req.session.user = userObj.id
      res.redirect(`/users/${userObj.id}`)
    })
  }
})

router.get('/login', (req, res) => {
  res.render('login', { user: req.session.user || null , message: '' })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  return loginUser(email, password)
  .then((user) => {
    if (user === false) {
      res.render('login', {error: 'Incorrect login info'})
    } else {
      req.session.user = user.id
      res.redirect(`/users/${user.id}`)
    }
  })
})

router.get('/logout', (req, response) => {
  req.session.destroy(() => {
    response.redirect('/')
  })
})

router.get('/users/:id', (req, res) => {
  userId = req.params.id
  return userProfile(userId)
  .then((user) => {
    return userPost(user.id)
    .then((posts) => {
      res.render('profile', {user: req.session.user, edit: false, posts})
    })
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
  const {name, current_city} = req.body
  return updateUser(userId, name, current_city)
  .then(() => {
    res.redirect(`/users/${userId}`)
  })
})

router.get('/post/:id', (req, res) => {
  console.log('inside of post/:id',req.session.user)
  postId = req.params.id
  return findPost(postId)
  .then((post) => {
    return userProfile(post.user_id)
    .then((user) => {
      res.render('post', {post, user:req.session.user})
    })
  })
})

module.exports = router
