INSERT INTO users (sub)
VALUES ('jhsgdw77w6dtfsdyigl7'),
('google-oauth2|106985537467241346399');

INSERT INTO trips (user_id ,trip_name, trip_center_lat, trip_center_lng, zoom)
VALUES (1, 'Spanish Road Trip', 40.5, -3.7, 10),
(1, 'Moms Peru Trip', 40.5, 3.7, 10),
(2, 'Spanish Road Trip', 40.5, -3.7, 10),
(2, 'Moms Peru Trip', 40.5, 3.7, 10);

INSERT INTO locations (trip_id, location_name, location_type, location_lat, location_lng)
VALUES (1, 'Sagrata Familia', 'landmark', 41.4036, 2.1744),
(2, 'Machu Picchu', 'landmark', -13.2263, -72.4973),
(3, 'Sagrata Familia', 'landmark', 41.4036, 2.1744),
(4, 'Machu Picchu', 'landmark', -13.2263, -72.4973);