const { createUser, findUserByEmail } = require('./db/users')

const signupUser = (email, password) => {
  return createUser(email, password)
}

const loginUser = (email, password) => {
  return findUserByEmail(email, password)
  .then(userInfo => {
    if (userInfo.length === 0) {
      return false
    } else {
      return userInfo
    }
  })
}

module.exports = {
  signupUser,
  loginUser
}
