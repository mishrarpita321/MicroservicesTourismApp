// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     transform: {
//       '^.+\\.jsx?$': 'babel-jest',
      
//     }
//   };


module.exports = {
  testEnvironment: 'node', // Assuming you're testing in a browser-like environment
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JSX files
    "\\.(css|less|sass|scss)$": "jest-transform-stub"
    
  },
  setupFiles: [
    './jest.setup.js'
  ]
};
