/* eslint-disable no-undef */
const tsPreset = require('ts-jest/jest-preset')
const mongoPreset = require('@shelf/jest-mongodb/jest-preset')

const collectCoverageFrom = [
  'src/**/*.{js,jsx,ts,tsx}',
  '!<rootDir>/node_modules/',
  '!<rootDir>/build/'
]

const testPathIgnorePatterns = ['<rootDir>/build/']

module.exports = {
  ...tsPreset,
  ...mongoPreset,
  collectCoverageFrom,
  testPathIgnorePatterns
}