import type { Config } from "jest";

const config: Config = {
  rootDir: "./src",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/tests/mocks/fileMock.ts",
  },
};

export default config;
