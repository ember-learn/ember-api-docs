'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
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
    'no-console': 'off',
    'ember/no-new-mixins': 'off',
    'ember/no-mixins': 'off',
    'ember/require-tagless-components': 'off',
    'ember/no-classic-classes': 'off',
    'ember/no-get': 'off',
    'ember/no-classic-components': 'off',
    'ember/no-private-routing-service': 'off',
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
        './run-tests.js',
        './bin/*',
        './prember-urls.js',
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
      extends: ['plugin:n/recommended'],
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
