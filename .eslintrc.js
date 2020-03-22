module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/no-jquery': 'off',
    'no-console': 'off',
    'ember/avoid-leaking-state-in-ember-objects': 1
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
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
        ecmaVersion: 2017
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
