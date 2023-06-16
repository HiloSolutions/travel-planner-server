const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { formatDate } = require("../helper-functions/convertDates");
const { format } = require('date-fns');

//get data related to the trip itself (there can be many locations in one trip)
router.get('/', (req, res) => {
  const id = req.query.id;
  const adjustedId = parseInt(id, 10);
  const query = `
  SELECT 
    trip_name, 
    trip_center_lat, 
    trip_center_lng,  
    zoom
  FROM trips
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


//get list of all trips made by the user
router.get('/list', (req, res) => {
  console.log("getting user data /list!");
  const sub = req.query.sub;
  const params = [sub];
  const queryStr = `
  SELECT trips.* 
  FROM trips
  LEFT JOIN users ON users.id = trips.user_id
  WHERE users.sub = $1;
  `;


  db.query(queryStr, params)
    .then((result) => {

      const data = result.rows.map((obj) => {
        const dateString = obj.date_updated;
        const dateObject = new Date(dateString);
        const formattedDate = format(dateObject, 'MMM. d, yyyy');
        // eslint-disable-next-line camelcase
        obj.date_updated = formattedDate;
        return obj;
      });
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
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