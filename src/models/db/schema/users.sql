DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100),
  current_city VARCHAR(100),
  join_date TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  description TEXT NOT NULL,
  city VARCHAR(100),
  title VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
