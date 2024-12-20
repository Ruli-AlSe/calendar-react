export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/mocks/styleMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
