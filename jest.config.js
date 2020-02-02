module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!jest.config.js",
    "!**/node_modules/**",
    "!**/test/**",
    "!**/vendor/**",
    "!**/coverage/**"
  ],
  coverageDirectory: "coverage"
};
