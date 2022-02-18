const { User, Trip } = require('../../models');
const { createTrip, getUserTrips } = require('../../controllers/tripController');

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

describe('Trip Controller - getUserTrips', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      params: {
        userId: 1
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return status 200 with users trips if successful', async () => {
    const trips = [
      {
        name: 'trip 1'
      },
      {
        name: 'trip 2'
      }
    ];
    const user = {
      getTrips: jest.fn().mockImplementation(() => trips)
    };
    User.findByPk = jest.fn().mockImplementation(() => user);

    await getUserTrips(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(trips);
    expect(User.findByPk).toHaveBeenCalledWith(req.params.userId);
  });

  it('should set status to 404 if no user is found', async () => {
    User.findByPk = jest.fn().mockImplementation(() => null);

    await getUserTrips(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(new Error('User not found'));
  });
});
