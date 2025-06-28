module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|react-navigation|@react-navigation|react-native-reanimated|react-native-safe-area-context|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/types/**/*',
    '!src/**/types.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 4,
      lines: 8,
      statements: 8
    }
  },
  coverageReporters: ['text', 'lcov', 'html']
};
