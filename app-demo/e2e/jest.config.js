/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.ts', '<rootDir>/e2e/*.test.ts', '<rootDir>/e2e/*.e2e.test.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  //setupFilesAfterEnv: ['./e2e/init.js'],
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  preset: 'react-native',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};