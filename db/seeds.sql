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
('Pit Stop', 'pitstop');





INSERT INTO locations (
  trip_id,
  location_type_id,
  location_name, 
  location_lat, 
  location_lng)
VALUES 
(1, 1, 'Sagrata Familia', 41.4036, 2.1744),
(2, 1, 'Machu Picchu', -13.2263, -72.4973),
(4, 1, 'Sagrata Familia', 41.4036, 2.1744),
(4, 1, 'Machu Picchu', -13.2263, -72.4973);