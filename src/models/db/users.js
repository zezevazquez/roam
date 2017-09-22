const db = require('./db')

const createUser = (email, password) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
  `, [email, password])
}

const findUserByEmail = (email, password) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      email=$1 AND password=$2
  `, [email, password])
}


const findUserById = (userId) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      id=$1
  `, [userId])
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
      posts.*, cities.name
    FROM
      posts
    INNER JOIN
      cities
      ON
      posts.city_id = cities.id
    WHERE
      posts.user_id=$1;
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

const cityById = (city_id) => {
  return db.query(`
    SELECT
      *
    FROM
      cities
    WHERE
      id=$1;
  `, [city_id])
}

const cityPost = (city_id) => {
  return db.query(`
    SELECT
      *
    FROM
      posts
    WHERE
      city_id=$1;
  `, [city_id])
}

const createPost = (title, description, city_id, user_id) => {
  return db.query(`
    INSERT INTO
      posts (title, description, city_id, user_id)
    VALUES
      ($1::text, $2::text, $3::INTEGER, $4::INTEGER)
    RETURNING
      *
  `, [title, description, city_id, user_id])
}



module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  postByUser,
  postById,
  cityById,
  cityPost,
  createPost
}
