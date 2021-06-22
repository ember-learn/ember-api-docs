'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'ember/no-jquery': 'off',
    'no-console': 'off',
    'ember/no-new-mixins': 'off',
    'ember/no-mixins': 'off',
    'ember/native-classes': 'off',
    'ember/require-tagless-components': 'off',
    'ember/no-test-this-render': 'off',
    'ember/no-classic-classes': 'off',
    'ember/no-get': 'off',
    'ember/no-actions-hash': 'off',
    'ember/no-classic-components': 'off',
    'ember/no-private-routing-service': 'off',
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'run-tests.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/**/*.js',
        'bin/*',
        'server/**/*.js',
      ],
      excludedFiles: ['config/deprecation-workflow.js'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2017,
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};
