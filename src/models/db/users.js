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
  console.log('inside db function findUserByEmail', email, password)
  return db.query(`
    SELECT
      id, email, password
    FROM
      users
    WHERE
      email=$1 AND password=$2`, [email, password])
}

const findUserProfile = (userId) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      id=$1`, [userId])
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserProfile
}
