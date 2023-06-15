const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { format } = require('date-fns');


//Check if user exists
router.get('/getData', (req, res) => {
  console.log("getting user data!");
  const sub = req.query.sub;
  const params = [sub];
  const queryStr = `
  SELECT trips.*, locations.* 
  FROM trips
  LEFT JOIN users ON users.id = trips.user_id
  LEFT JOIN locations ON trips.id = locations.trip_id
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


//add user to database if they don't already exist.
router.post('/update', (req, res) => {

  const sub = req.query.sub;
  const selectQuery = `
  SELECT * FROM users
  WHERE sub = $1;
`;
  const selectParams = [sub];

  //check if user exists
  db.query(selectQuery, selectParams)
    .then((result) => {

      if (result.rows.length > 0) {
        // sub value already exists in the database
        res.json({ message: 'sub value already exists' });
      } else {
        // sub value does not exist, perform insert query
        const insertQuery = `
          INSERT INTO users (sub)
          VALUES ($1);
        `;
        const insertParams = [sub];

        db.query(insertQuery, insertParams)
          .then(() => {
            res.json({ message: 'User added to database' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;