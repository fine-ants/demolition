/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  moduleNameMapper: {
    "^@hooks(.*)$": "<rootDir>/packages/hooks$1",
    "^@utils(.*)$": "<rootDir>/packages/utils$1",
  },
  testMatch: ["**/?(*.)+(test).(ts|tsx)"],
  testPathIgnorePatterns: ["node_modules", "dist"],
};
