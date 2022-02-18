const { User } = require('../../models');
const { loginUser, getLogin, getUsers, registerUser } = require('../../controllers/userController');

describe('User Controller - Login', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      body: {
        email: 'test@test.com',
        password: '123456'
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should set status to 401 when database doesnt find user', async () => {
    User.findOne = jest.fn().mockImplementation(() => null);

    await loginUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error('Invalid credentials'));
  });

  it('should return a user with status 200 if login succeeds', async () => {
    User.findOne = jest.fn().mockImplementation(() => ({
      id: 1,
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    }));

    await loginUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User login successfull',
      user: {
        id: 1,
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
        accessToken: 'supersecrettoken'
      }
    });
  });
});

describe('User Controller - Register', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      body: {
        email: 'test@test.com',
        firstName: 'Ola',
        lastName: 'Nordmann',
        password: '123456'
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should set status to 400 if request data is invalid', async () => {
    req.body.email = '';

    await registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledWith(new Error('Validation failed for submitted data'));
  });

  it('should set status to 400 if user already exists', async () => {
    const user = {
      email: 'test@test.com'
    };
    User.findOne = jest.fn().mockImplementation(({ attributes }) => user);

    await registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledWith(new Error('User already exists'));
  });

  it('should return user with status 201 if register is successful', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      firstName: 'Ola',
      lastName: 'Normann'
    };
    User.findOne = jest.fn().mockImplementation(() => null);
    User.create = jest.fn().mockImplementation(() => user);

    await registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken: 'supersecrettoken'
      }
    });
  });
});

describe('User Controller - getUsers', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = jest.fn();
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return all users with status 200', async () => {
    const usersInDB = [
      {
        email: 'test@test.com',
        firstName: 'Jane',
        lastName: 'Doe'
      },
      {
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    ];
    User.findAll = jest.fn().mockImplementation(({ attributes }) => usersInDB);

    await getUsers(req, res, next);

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usersInDB);
  });
});

describe('User Controller - getLogin', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      user: {
        id: 1,
        email: 'test@test.com',
        firstName: 'Tester',
        lastName: 'Test'
      }
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return the requested user with status 200', async () => {
    await getLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.user);
  });
});
