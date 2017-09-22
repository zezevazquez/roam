DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100),
  current_city VARCHAR(100),
  join_date TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(
  id SERIAL PRIMARY KEY,
  image TEXT,
  name VARCHAR(100)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  description TEXT NOT NULL,
  city_id INTEGER,
  title VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
