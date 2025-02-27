/* eslint-env node:true */
'use strict';

module.exports = {
  extends: 'recommended',
  overrides: [
    {
      files: ['tests/**/*'],
      rules: {
        'no-potential-path-strings': false,
        'no-curly-component-invocation': false,
        'no-action': false,
      },
    },
  ],
};
