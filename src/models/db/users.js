const db = require('./db')

const createUser = (email, password) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING *

  `, [email, password])
}

const findUserByEmail = (email, password) => {
  return db.query(`
    SELECT
      id, email, password
    FROM
      users
    WHERE
      email=$1 AND password=$2`, [email, password])
}


const findUserById = (userId) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      id=$1`, [userId])
}

const updateUserProfile = (userId, name, currentCity) => {
  return db.query(`
    UPDATE
      users
    SET
      name = $2,
      current_city = $3
    WHERE
      id = $1;
    `, [userId, name, currentCity])
}

const postByUser = (userId) => {
  return db.query(`
    SELECT
      *
    FROM
      posts
    WHERE
      user_id=$1;
  `, [userId])
}

const postById = (postId) => {
  return db.query(`
    SELECT
      *
    FROM
      posts
    WHERE
      id=$1;
  `, [postId])
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  postByUser,
  postById
}
