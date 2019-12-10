require('dotenv').config();
require('./lib/utils/connect.js')();
const chance = require('chance').Chance();
const Car = require('./lib/models/Car');

Car.create([...Array(10000)].map(() => ({
  model: chance.model(),
  brand: chance.brand(),
  automatic: chance.bool()
})))
  .then(() => console.log('done'));


async function allCrudMethods(){

  const createdCar = await Car.create({
    model: 'forester',
    brand: 'subaru',
    automatic: true
  });

  const aSingleFoundCar = await Car.findById(createdCar._id);
  const allFoundCars = await Car.find();

  const updatedCar = await Car.findByIdAndUpdate(aSingleFoundCar._id, 
    {  model: 'forester' },
    { brand: 'subaru' },
    { automatic: true });

  const deleteCar = await Car.findByIdAndDelete(aSingleFoundCar._id);
}

module.export =  allCrudMethods;
