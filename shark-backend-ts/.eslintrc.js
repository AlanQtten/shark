module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    // 'import/resolver': {
    //   node: {
    //     paths: ['src'],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    //   alias: {
    //     map: [
    //       ['types', './src/types'],
    //       ['enums', './src/enums'],
    //       ['types', './src/types'],
    //     ],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    // },
  },
  rules: {
    quotes: ['error', 'single', {
      allowTemplateLiterals: true,
    }],
    'max-len': 'off',
    'no-case-declarations': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'no-extend-native': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    // TODO
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': ['error', {
      functions: false,
    }],
  },
};
