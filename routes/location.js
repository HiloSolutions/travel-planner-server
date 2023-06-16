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



//get he locations saved by the user
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

module.exports = router;