const { createUser } = require('./db/users')

const signupUser = (email, password) => {
  return createUser(email, password)
}

module.exports = {
  signupUser
}
