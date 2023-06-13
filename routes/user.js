const express = require("express");
const router = express.Router();
const db = require("../db/connection");


//Check if user exists
router.get('/check', (req, res) => {
  console.log("getting user data!");

  const queryStr = `
  SELECT * FROM users
  WHERE users.id = 1
  `;


  db.query(queryStr)
    .then((result) => {
      console.log('jhsgdhsg', result.rows);
      res.json(result.rows);
    })
    .catch((err) => {
      console.error(err);
    });


});


//add user to database if they don't already exist.
router.post('/update', (req, res) => {
  const sub = req.query.sub;

  //check if user exists
  const selectQuery = `
  SELECT * FROM users
  WHERE sub = $1;
`;
  const selectParams = [sub];

  db.query(selectQuery, selectParams)
    .then((result) => {

      if (result.rows.length > 0) {

        // sub value already exists in the database
        console.log('sub value already exists');
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
            console.log('added user to db');
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