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

module.exports = {
  createUser
}
