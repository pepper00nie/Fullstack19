module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-underscore-dangle': [
      'error',
      'never'
    ],
    semi: [
      'error',
      'never'
    ],
    'no-unused-expressions': [1, {
      'allowTernary': true
    },],
  },
};
