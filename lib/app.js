const express = require('express');
const app = express();
const Car = require('./models/Car');

app.use(express.json());

app.post('/car', (req, res) => {
  const {
    model,
    brand,
    automatic
  } = req.body;

  Car.create({ model, brand, automatic })
    .then((createdCar) => {
      res.send(createdCar);
    });
});

app.get('/cars', (req, res) => {
  Car
    .find()
    .then(allCars => res.send(allCars))
    .catch(err => console.log(err));
});


module.exports = app;

// const {
//     model,
//     brand,
//     automatic } = req.body;

// Car
//     .creat
