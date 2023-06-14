
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  sub VARCHAR(255) NOT NULL
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  trip_name VARCHAR(255) DEFAULT 'Untitled Trip',
  trip_center_lat DECIMAL,
  trip_center_lng DECIMAL,
  trip_start_date DATE,
  trip_end_date DATE,
  zoom SMALLINT DEFAULT 10,
  date_updated DATE DEFAUlT CURRENT_DATE
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  location_name VARCHAR(255) NOT NULL,
  location_type VARCHAR(255) NOT NULL,
  location_lat DECIMAL,
  location_lng DECIMAL,
  date_updated DATE DEFAUlT CURRENT_DATE
);
