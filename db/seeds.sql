INSERT INTO users (sub)
VALUES 
('jhsgdw77w6dtfsdyigl7'),
('google-oauth2|106985537467241346399');

INSERT INTO trips (
  user_id,
  trip_name, 
  trip_center_lat, 
  trip_center_lng, 
  zoom
  )
VALUES 
(1, 'Spanish Road Trip', 40.5, -3.7, 10),
(1, 'Moms Peru Trip', 40.5, 3.7, 10),
(2, 'Spanish Road Trip', 40.5, -3.7, 10),
(2, 'Moms Peru Trip', 40.5, 3.7, 10);




INSERT INTO location_types (
  location_type_name,
  location_type_category
)
VALUES
('Tourist Attraction', 'sightSeeing'),
('Outdoor Activity', 'outdoors'),
('Nightlife', 'nightlife'),
('Food and Drink', 'foodAndDrink'),
('Arts and Education', 'artAndEducation'),
('Point of Curiosity', 'pointOfCuriosity'),
('Accomodation', 'accomodation'),
('Airport / Port / Station', 'transportation'),
('Pit Stop', 'pitstop'),
('No Category', 'noCategory');





INSERT INTO locations (
  trip_id,
  location_type_id,
  location_name, 
  location_lat, 
  location_lng)
VALUES 
(1, 1, 'Sagrata Familia', 41.4036, 2.1744),
(2, 1, 'Machu Picchu', -13.2263, -72.4973),
(4, 1, 'Machu Picchu', -13.2263, -72.4973),
(4, 2, 'Rainbow Mointains', 52.7500, -125.8333),
(4, 3, 'Ukukus Bar and Nightlife', -13.5164, -73.0000),
(4, 4, 'Astrid & Gaston', -12.1464, -77.0000),
(4, 5, 'Museu de Arte de Lima', -12.0464, -77.0428),
(4, 6, 'Arequipa', -16.4090, -71.5375),
(4, 7, 'Wyndham Trujillo', -8.1158, -79.0257),
(4, 8, 'Cuenca Gas Station', -12.1578, -76.4447),
(4, 9, 'Jorge Chavez International Airport', -12.021944, -77.114444);