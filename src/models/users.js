const { createUser, findUserByEmail, findUserProfile, updateUserProfile } = require('./db/users')

const signupUser = (email, password) => {
  return createUser(email, password)
  .then((user) => {
    return user[0]
  })
}

const loginUser = (email, password) => {
  return findUserByEmail(email, password)
  .then(userInfo => {
    if (userInfo.length === 0) {
      return false
    } else {
      return userInfo[0]
    }
  })
}

const userProfile = (userId) => {
  return findUserProfile(userId)
  .then((user) => {
    return user[0]
  })
}

const updateUser = (userId, name, current_city) => {
  return updateUserProfile(userId, name, current_city)
}

module.exports = {
  signupUser,
  loginUser,
  userProfile,
  updateUser
}
