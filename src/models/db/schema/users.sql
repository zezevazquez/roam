DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100),
  current_city VARCHAR(100),
  join_date DATE DEFAULT current_timestamp
);
