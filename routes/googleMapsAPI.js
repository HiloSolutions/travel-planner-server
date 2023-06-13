
const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get('/places', (req, res) => {
  const input = req.query.input;
  const inputType = req.query.inputType;
  const fields = req.query.fields;
  const key = 'AIzaSyDnROlwaojo4z_GDRvAZz8PUUfSnzKaVd4';
  const url = req.query.url;

  const queryParams = {
    input,
    inputType,
    fields,
    key
  };

  axios.get(url, queryParams)
    .then(response => {
      const data = response.data;
      const responseData = { message: 'Hello from the server!' };
      res.json([]);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  

});

module.exports = router;