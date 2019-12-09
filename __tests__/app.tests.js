require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('application routes', () => {
  beforeAll(() => {
    connect();
  });
  afterAll(() => {
    return mongoose.connection.dropDatabase();
  });
  it('create a car using a post', () => {
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


  //   it('has a /hello post route', () => {
  //     return request(app)
  //       .post('/car')
  //       .send({
  //         brand: 'toyota', 
  //         model: 'prius',
  //         automatic: true
  //       })
  //       .then(res => {
  //         expect(res.body).toEqual({
  //           __v: 0,
  //           _id: expect.any(String),
  //           brand: 'toyota', 
  //           model: 'prius',
  //           automatic: true
  //         });
  //       });
  //   });
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
