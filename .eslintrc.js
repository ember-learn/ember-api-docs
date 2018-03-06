module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  plugins: ["ember"],
  extends: ["eslint:recommended", "plugin:ember/recommended"],
  env: {
    browser: true
  },
  globals: {
    heimdall: true,
    FastBoot: true
  },
  rules: {
    "ember/no-jquery": "off",
    "no-unused-vars": [
      "error",
      {
        args: "none"
      }
    ],

    // from JSHint
    "no-cond-assign": ["error", "except-parens"],
    eqeqeq: "error",
    "no-eval": "error",
    "new-cap": [
      "error",
      {
        capIsNew: false
      }
    ],
    "no-caller": "error",
    "no-irregular-whitespace": "error",
    "no-undef": "error",
    "no-eq-null": "error",

    // from JSCS
    "array-bracket-spacing": ["error", "never"],
    "comma-style": ["error", "last"],
    "brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: true
      }
    ],
    "no-spaced-func": "error",
    "no-empty": "error",
    curly: ["error", "all"],
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "comma-dangle": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    "keyword-spacing": [
      "error",
      {
        overrides: {
          else: {
            before: true
          },
          while: {
            before: true
          },
          catch: {
            before: true
          }
        }
      }
    ]
  },
  overrides: [
    // node files
    {
      files: [
        "testem.js",
        "ember-cli-build.js",
        "config/**/*.js",
        "lib/*/index.js"
      ],
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    },

    // test files
    {
      files: ["tests/**/*.js"],
      excludedFiles: ["tests/dummy/**/*.js"],
      env: {
        embertest: true
      }
    }
  ]
};
