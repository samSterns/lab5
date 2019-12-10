const express = require('express');
const app = express();
const Car = require('./models/Car');

app.use(express.json());

app.post('/car', (req, res) => {
  Car
    .create(req.body)
    .then(car => car.send(note));
});

app.get('/cars', (req, res) => {
  Car
    .find()
    .then(allCars => res.send(allCars));
});

app.get('/cars/:carsId', (req, res) => {
  Car
    .findById(req.params.carId)
    .then(car => res.send(car));
});

app.patch('/cars/:carId', (req, res) => {
  Car
    .findByIdAndUpdate(req.params.carId,
      req.body, 
      { new: true })
    .then(car => res.send(car));
});

app.delete('/cars/:carId', (req, res) => {
  Car
    .findByIdAndDelete(req.params.noteId)
    .then(car => res.send(car));
});

module.exports = app;
