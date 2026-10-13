import { module, test } from 'qunit';
import { formatURL } from 'ember-api-docs/locations/trailing-history';

module('Unit | Location | trailing-history | formatURL', function () {
  const cases = [
    {
      input: '/ember/6.8/classes/Ember.Controller',
      output: '/ember/6.8/classes/Ember.Controller/',
      label: 'adds trailing slash to bare path',
    },
    {
      input: '/ember/6.8/classes/Ember.Controller/',
      output: '/ember/6.8/classes/Ember.Controller/',
      label: 'leaves already-trailing-slashed path unchanged',
    },
    {
      input: '/ember/6.8/classes/Ember.Controller?show=deprecated',
      output: '/ember/6.8/classes/Ember.Controller/?show=deprecated',
      label: 'adds trailing slash before query string',
    },
    {
      input: '/ember/6.8/classes/Ember.Controller?show=deprecated#addObserver',
      output:
        '/ember/6.8/classes/Ember.Controller/?show=deprecated#addObserver',
      label: 'adds trailing slash before query string, preserving hash',
    },
    {
      input: '/ember/6.8/classes/Ember.Controller#addObserver',
      output: '/ember/6.8/classes/Ember.Controller/#addObserver',
      label: 'adds trailing slash before hash when no query string',
    },
    {
      input: '/ember/6.8/classes/Ember.Controller/?show=deprecated#addObserver',
      output:
        '/ember/6.8/classes/Ember.Controller/?show=deprecated#addObserver',
      label:
        'leaves already-trailing-slashed path with query and hash unchanged',
    },
  ];

  for (let { input, output, label } of cases) {
    test(label, function (assert) {
      assert.strictEqual(formatURL(input), output);
    });
  }
});
