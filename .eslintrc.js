module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  plugin: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    camelCase: 'off',
    'perfer-const': 'off',
    'prettier/prettier': 'error',
  },
}
