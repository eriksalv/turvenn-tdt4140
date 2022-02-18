const { Trip } = require('../../models');
const { createTrip } = require('../../controllers/tripController');

describe('Trip Controller - Create Trip', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      body: {
        name: 'En testtur',
        start: 'her',
        goal: 'der',
        date: 'dato',
        difficulty: 'vasnkelig',
        duration: '2 dager',
        description: 'vasnkelig tur'
      },
      user: {
        id: 1
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return created trip with status 201 if successfull', async () => {
    const trip = req.body;
    Trip.create = jest.fn().mockImplementation(() => trip);

    await createTrip(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Trip created successfully',
      trip
    });
  });

  it('should call next with error and status 400 if trip data is invalid', async () => {
    Trip.create = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    await createTrip(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledWith(new Error('Invalid trip data'));
  });
});
