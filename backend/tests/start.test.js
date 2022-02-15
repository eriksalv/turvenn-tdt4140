const { loginUser } = require('../controllers/userController');

test('should add numbers correctly', () => {
  const num1 = 2;
  const num2 = 3;

  const num3 = num1 + num2;

  expect(num3).toBe(5);
});
