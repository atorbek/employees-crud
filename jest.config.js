module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  setupFiles: [
    '<rootDir>/jest-setup.ts'
  ],
  testPathIgnorePatterns: [
    '/build/',
    '/node_modules/',
    '__tests__/__mocks__/*'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$'
};
