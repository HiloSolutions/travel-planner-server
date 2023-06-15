const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { formatDate } = require("../helper-functions/convertDates");

router.get('/', (req, res) => {
  const id = req.query.id;
  const adjustedId = parseInt(id, 10);
  const query = `
  SELECT * FROM trips
  WHERE id = $1;
  `;
  const params = [adjustedId];

  db.query(query, params)
    .then((response) => {
      const startDate = formatDate(response.rows[0].trip_start_date);
      let endDate = formatDate(response.rows[0].trip_end_date);

      if (endDate < startDate) {
        endDate = startDate;
      }
    
      const data = {
        ...response.rows[0],
        'trip_start_date': startDate,
        'trip_end_date': endDate
      };

      res.json(data);
    })
    .catch(() => {
      res.status(500).json({ error: 'An error occurred' });
    });
});


router.post('/update', (req, res) => {
  const { inputs, id } = req.body;
  const { lat, lng, startDate, endDate, zoom } = inputs;
  const adjustedId = parseInt(id, 10);
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
    adjustedId
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