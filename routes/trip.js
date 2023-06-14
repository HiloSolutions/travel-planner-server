const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post('/update', (req, res) => {
  const { inputs, id } = req.body;
  const { lat, lng, startDate, endDate, zoom } = inputs;

  const query = `
  UPDATE trips
  SET trip_center_lat = $1,
  trip_center_lng = $2,
  trip_start_date = $3,
  trip_end_date = $4,
  zoom = $5
  WHERE id = $6;
  `;

  const params = [
    lat,
    lng,
    startDate,
    endDate,
    zoom,
    id
  ];

  db.query(query, params)
    .then(() => {
      res.json({ message: 'Trip updated in database' });
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;