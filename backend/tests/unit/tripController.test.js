const { User, Trip } = require('../../models');
const {
  createTrip,
  getUserTrips,
  signUp,
  signOff,
  getParticipators,
  getTrip,
  getTrips,
  searchTripByName
} = require('../../controllers/tripController');

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

describe('Trip Controller - signup/signoff', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      params: {
        tripId: 1
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

  it('should set status to 404 if trip is not found (signup)', async () => {
    Trip.findByPk = jest.fn().mockImplementation(() => null);
    User.findByPk = jest.fn().mockImplementation(() => null);

    await signUp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(new Error('Trip not found'));
  });

  it('should set status to 404 if trip is not found (signoff)', async () => {
    Trip.findByPk = jest.fn().mockImplementation(() => null);
    User.findByPk = jest.fn().mockImplementation(() => null);

    await signOff(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(new Error('Trip not found'));
  });

  it('should return a message with status 201 if successful (signup)', async () => {
    const user = {
      addParticipatedTrip: jest.fn().mockImplementation(() => {})
    };
    User.findByPk = jest.fn().mockImplementation(() => user);
    Trip.findByPk = jest.fn().mockImplementation(() => ({
      id: 1
    }));

    await signUp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully signed up' });
  });

  it('should return a message with status 200 if successful (signoff)', async () => {
    const user = {
      removeParticipatedTrip: jest.fn().mockImplementation(() => {})
    };
    User.findByPk = jest.fn().mockImplementation(() => user);
    Trip.findByPk = jest.fn().mockImplementation(() => ({
      id: 1
    }));

    await signOff(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully signed off' });
  });
});

describe('Trip Controller - getTrip, getTrips', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      params: {
        tripId: 1
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return status 404 if trip was not found (getTrip)', async () => {
    Trip.findByPk = jest.fn().mockImplementation(() => null);

    await getTrip(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(new Error('Trip not found'));
  });

  it('should return trip with status 200 if found (getTrip)', async () => {
    const trip = {
      id: 1
    };
    Trip.findByPk = jest.fn().mockImplementation(() => trip);

    await getTrip(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(trip);
  });

  it('should return trips with status 200 (getTrips)', async () => {
    const trips = [
      {
        id: 1
      },
      {
        id: 2
      }
    ];
    Trip.findAll = jest.fn().mockImplementation(() => trips);

    await getTrips(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(trips);
  });
});

describe('Trip Controller - searchTripByName, searchTripByName', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      query: {
        searchWord: 'Enda'
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return trip with status 200 if found searchWord', async () => {
    Trip.findAll = jest.fn().mockImplementation(() => [{ id: 1 }]);

    await searchTripByName(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('should return error with status 400 if empty searchWord', async () => {
    req = {
      query: {
        searchWord: ''
      }
    };
    await searchTripByName(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
