const { createUser, findUserByEmail, findUserById, updateUserProfile, postByUser, postById, cityById, cityPost } = require('./db/users')

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
  return findUserById(userId)
  .then((user) => {
    return user[0]
  })
}

const updateUser = (userId, name, current_city) => {
  return updateUserProfile(userId, name, current_city)
}

const userPost = (userId) => {
  return postByUser(userId)
  .then((posts) => {
    return posts
  })
  .catch(error => {
    throw error})
}

const findPost = (postId) => {
  return postById(postId)
  .then((post) => {
    return post[0]
  })
  .catch(error => {
    throw error})
}

const findCity = (city_id) => {
  return cityById(city_id)
  .then((city) => {
    return city[0]
  })
  .catch(error => {
    throw error})
}

const postsByCity = (city_id) => {
  return cityPost(city_id)
  .then((posts) => {
    return posts
  })
  .catch(error => {
    throw error})
}

module.exports = {
  signupUser,
  loginUser,
  userProfile,
  updateUser,
  userPost,
  findPost,
  findCity,
  postsByCity
}
