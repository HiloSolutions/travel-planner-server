/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const db = require("../db/connection");

//get all location types available to choose from (not specific to user)
router.get('/categories', (req, res) => {
  const query = `
  SELECT 
    location_type_name,
    location_type_category 
  FROM location_types;
  `;

  db.query(query)
    .then((response) => {
      res.json(response.rows);
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});



//get the locations saved by the user
router.get('/saved', (req, res) => {
  const id = req.query.id;
  const adjustedId = parseInt(id, 10);
  const query = `
  SELECT 
    locations.*,
    location_types.location_type_name,
    location_types.location_type_category 
  FROM locations
  LEFT JOIN location_types ON location_types.id = location_type_id
  WHERE locations.trip_id = $1;
  `;
  const params = [adjustedId];

  db.query(query, params)
    .then((response) => {
      res.json(response.rows);
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});



//delete a location from the db FOREVER!
router.delete('/delete', (req, res) => {
  const tripId = req.query.tripId;
  const locationId = req.query.locationId;
  const params = [tripId, locationId];
  const query = `
    DELETE FROM locations 
    WHERE trip_id = $1 AND id = $2
  `;

  db.query(query, params)
    .then(() => {
      res.json({ message: 'Location deleted from database' });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});



router.post('/add', (req, res) => {
  const { locationId, tripId, sub } = req.body;
  const {
    location_lat,
    location_lng,
    location_name,
    location_type_category,
    location_type_name,
  } = locationId;

  
  const query = `
  INSERT INTO locations (
    trip_id,
    location_name,
    location_type_id,
    location_lat,
    location_lng
    )
  SELECT
    trips.id,
    $1,
    location_types.id,
    $2,
    $3
  FROM trips
  JOIN users ON trips.user_id = users.id
  JOIN location_types ON location_types.location_type_name = $4
    AND location_types.location_type_category = $5
  WHERE users.sub = $6
    AND trips.id = $7;
    
`;

  const params = [
    location_name,           // $1
    location_lat,            // $2
    location_lng,            // $3
    location_type_name,      // $4
    location_type_category,  // $5
    sub,                     // $6
    tripId                   // $7
  ];

  db.query(query, params)
    .then(() => {
      res.json({ message: 'Location added to database' });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


//edit location in the database
router.post('/edit', (req, res) => {
  const { location } = req.body;
  const {
    location_name,
    location_lat,
    location_lng,
    category,
    id
  } = location;
  

  const query = `
  UPDATE locations
  SET
    location_name = $1,
    location_lat = $2,
    location_lng = $3,
    location_type_id = (
      SELECT id
      FROM location_types
      WHERE location_type_category = $4
      LIMIT 1
    ),
    date_updated = CURRENT_DATE
  FROM
    location_types
  WHERE
    locations.location_type_id = location_types.id
    AND locations.id = $5;
`;

  const params = [
    location_name,
    location_lat,
    location_lng,
    category,
    id
  ];


  db.query(query, params)
    .then(() => {
      res.json({ message: 'Location edited in database' });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;