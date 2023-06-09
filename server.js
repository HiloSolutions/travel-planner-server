require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 8000;


// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('hello world from express');
});


//import router
const googleMapsController = require('./routes/googleMapsAPI');
const userController = require('./routes/user');
const tripController = require('./routes/trip');
const locationController = require('./routes/location');


//use router
app.use('/api/maps', googleMapsController);
app.use('/api/user', userController);
app.use('/trip', tripController);
app.use('/location', locationController);



app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});