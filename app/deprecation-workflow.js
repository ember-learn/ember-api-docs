import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

setupDeprecationWorkflow({
  throwOnUnhandled: true,
  workflow: [
    { handler: 'throw', matchId: 'ember.component.reopen' },
    { handler: 'throw', matchId: 'implicit-injections' },
    { handler: 'throw', matchId: 'this-property-fallback' },
    { handler: 'throw', matchId: 'ember-component.is-visible' },
    {
      handler: 'throw',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
    {
      handler: 'silence',
      matchId: 'ember-data:deprecate-non-strict-relationships',
    },
    { handler: 'silence', matchId: 'ember-data:deprecate-store-find' },
    { handler: 'silence', matchId: 'remove-owner-inject' },
    { handler: 'silence', matchId: 'ember-polyfills.deprecate-assign' },
  ],
});
