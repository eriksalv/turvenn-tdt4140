const { User } = require('../../models');
const { loginUser } = require('../../controllers/userController');

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

    await loginUser(req, res, () => {});

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User login successfull',
      user: {
        id: 1,
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      token: 'some token'
    });
  });
});

describe('User Controller - Register', () => {
  it.todo('should set status to 400 if request data is invalid');

  it.todo('should set status to 400 if user already exists');

  it.todo('should return user with status 201 if register is successful');
});

describe('User Controller - getUsers', () => {
  it.todo('should return all users with status 200');
});
