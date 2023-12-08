/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  moduleNameMapper: {
    "^@hooks(.*)$": "<rootDir>/packages/hooks$1",
    "^@utils(.*)$": "<rootDir>/packages/utils$1",
  },
};
