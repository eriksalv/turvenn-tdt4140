module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverage: false,
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts}',
    '!**/types.js',
    '!**/src/main.js',
    '!**/node_modules/**',
    '!**/*.config.js',
    '!**/coverage/**',
    '!**/index.js'
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'node', 'jsx'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.jsx$': 'babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/config/CSSStub.js'
  }
};
