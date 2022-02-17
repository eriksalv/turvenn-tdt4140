const validationResult = (req) => {
  const res = {
    value: 'notempty',
    isEmpty: () => false
  };

  return res;
};

module.exports = {
  validationResult
};
