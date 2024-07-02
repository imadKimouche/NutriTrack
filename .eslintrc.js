module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
  },
  ignorePatterns: [
    '**/__mocks__/*.ts',
    'src/third-party',
    'ios',
    'android',
    'coverage',
    '*.lock',
    '.husky',
    'patches',
    '*.html',
    'src/locale/locales/_build/',
    'src/locale/locales/**/*.js',
  ],
};
