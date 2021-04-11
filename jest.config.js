module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts?$": "ts-jest",
    // "^.+\\.ts?$": "babel-jest"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  modulePathIgnorePatterns: ["src/backend.json"],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
};
