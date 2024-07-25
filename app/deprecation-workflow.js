import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

setupDeprecationWorkflow({
  workflow: [
    { handler: 'silence', matchId: 'ember.component.reopen' },
    { handler: 'silence', matchId: 'implicit-injections' },
    { handler: 'silence', matchId: 'this-property-fallback' },
    { handler: 'silence', matchId: 'ember-component.is-visible' },
    {
      handler: 'silence',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
  ],
});
