const router = require('express').Router()
const { signupUser, loginUser, userProfile, updateUser, userPost, findPost, findCity, postsByCity, createNewPost } = require('../../models/users')


router.get('/', (req, res) => {
  // console.log(req.session.user)
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
    .then((user) => {
      req.session.user = user
      res.redirect(`/users/${user.id}`)
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
      req.session.user = user
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
  if (req.session.user === undefined) {
    res.redirect('/login')
  } else {
    return userProfile(userId)
    .then((user) => {
      return userPost(user.id)
      .then((posts) => {
        res.render('profile', {user: req.session.user, edit: false, posts})
      })
    })
  }
})

router.get('/users/edit/:id', (req, res) => {
  userId = req.params.id
  return userProfile(userId)
  .then((user) => {
    res.render('profile', {user, edit: true, posts: []})
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
  postId = req.params.id
  return findPost(postId)
  .then((post) => {
    return userProfile(post.user_id)
    .then((user) => {
      res.render('post', {post, user:req.session.user})
    })
  })
})






router.get('/post/edit/:id', (req, res) => {
  postId = req.params.id
  return findPost(postId)
  .then((post) => {
    res.render('editPostForm', {post, user:req.session.user})
  })
})

router.post('/post/edit/:id', (req, res) => {
  userId = req.params.id
  const {name, current_city} = req.body
  return updateUser(userId, name, current_city)
  .then(() => {
    res.redirect(`/users/${userId}`)
  })
})






router.get('/city/:id', (req, res) => {
  cityId = req.params.id
  return findCity(cityId)
  .then((city) => {
    return postsByCity(city.id)
    .then((posts) => {
      // send session user in as object
      res.render('city', {city, posts, user:req.session.user})
    })
  })
})

router.post('/city/:id', (req, res) => {
  const {title, description, city_id, user_id} = req.body
  return createNewPost(title, description, city_id, user_id)
  .then((post) => {
    return userProfile(post.user_id)
    .then((user) => {
      res.render('post', {post, user:req.session.user})
    })
  })
})

module.exports = router
