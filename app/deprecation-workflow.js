import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

setupDeprecationWorkflow({
  throwOnUnhandled: true,
  workflow: [
    { handler: 'throw', matchId: 'ember.component.reopen' },
    { handler: 'throw', matchId: 'implicit-injections' },
    { handler: 'silence', matchId: 'this-property-fallback' },
    { handler: 'throw', matchId: 'ember-component.is-visible' },
    {
      handler: 'silence',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
  ],
});
