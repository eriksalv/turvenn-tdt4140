const useDispatch = jest.fn().mockImplementation(() => jest.fn());
const useSelector = jest.fn();

module.exports = { useDispatch, useSelector };
