
const express = require("express");
const router = express.Router();

router.get('/places', (req, res) => {

  //include url and params in client

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const responseData = { message: 'Hello from the server!' };
  res.json(responseData);
});

module.exports = router;