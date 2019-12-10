const Car =  require('./Car');

describe('carModel', () => {
  it('requires a model', () => {
    const car = new Car ({
      brand: 'toyota', 
      automatic: true
    });
    const { errors } = car.validateSync();
    expect(errors.model.message).toEqual('Path `model` is required.');
  });
  it('requires a brand', () => {
    const car = new Car ({
      model: 'prius', 
      automatic: true
    });
    const { errors } = car.validateSync();
    expect(errors.brand.message).toEqual('Path `brand` is required.');
  });
  it('requires an automatic', () => {
    const car = new Car ({
      brand: 'toyota', 
      model: 'prius', 
    });
    const { errors } = car.validateSync();
    expect(errors.automatic.message).toEqual('Path `automatic` is required.');
  });
});
