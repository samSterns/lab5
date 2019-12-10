require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('application routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  afterAll(() => {
    return mongoose.connection.dropDatabase();
  });

  it('create a car using a POST', () => {
    return request(app)
      .post('/cars')
      .send({
        brand: 'toyota', 
        model: 'prius',
        automatic: true
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          brand: 'toyota', 
          model: 'prius',
          automatic: true,
          _v: 0
        });
      });
  });

  it('gets all notes', async() => {
    const car = await Car.create([
      { model: 'forester', brand: 'toyota' },
      { model: 'prius', brand: 'subaru' },
      { model: 'bug', brand: 'subaru' }
    ]);

    return request(app)
      .get('/car')
      .then(res => {
        car.forEach(car => {
          expect(res.body).toContainEqual({
            _id: car._id.toString(),
            title: car.title,
            body: car.body,
            _v: car._v
          });
        });
      });
  });

  it('gets a car by id on GET', async() => {
    const car = await Car.create({
      model:'prius',
      brand: 'toyota'
    });

    return request(app)
      .get(`/car/${car._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: car._id.toString(),
          model: car.model,
          brand: car.brand,
          _v: car._v
        });
      });
  });

  it('updates a note with a PATCH', async() => {
    const car = await Car.create({
      model: 'prius',
      brand: 'toyota',
    });

    return request(app) 
      .patch((`/car/${car._id}`))
      .send({ model: 'ttoyaot' })
      .then(res => {
        expect(res.body).toEqual({
          _id: car._id.toString(),
          model: 'prius',
          brand: 'toyota',
          _v: car._v
        });
      });
  });


  it('can delete car with DELETE', async() => {
    const car = await Car.create({
      model: 'prius',
      brand: 'toyota'
    });
    return request(app)
      .delete()
      .then(res => {
        expect(res.body).toEqual({

        });
      });
  });

  it('can get car', () => {
    return request(app)
      .get('/cars')
      .then(res => {
        expect(res.body).toEqual([{
          __v: 0,
          _id: expect.any(String),
          brand: 'toyota', 
          model: 'prius',
          automatic: true
        }]);
        expect(res.body).toHaveLength(1);
      });
  });
});
