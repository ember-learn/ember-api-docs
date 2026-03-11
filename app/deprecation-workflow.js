import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

setupDeprecationWorkflow({
  throwOnUnhandled: false,
  workflow: [
    {
      handler: 'throw',
      matchId: 'ember.component.reopen',
    },
    {
      handler: 'throw',
      matchId: 'implicit-injections',
    },
    {
      handler: 'throw',
      matchId: 'this-property-fallback',
    },
    {
      handler: 'throw',
      matchId: 'ember-component.is-visible',
    },
    {
      handler: 'throw',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
    {
      handler: 'silence',
      matchId: 'importing-inject-from-ember-service',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import-change-properties-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import-libraries-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import-test-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import--is-destroying-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import--is-destroyed-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import-destroy-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import--register-destructor-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'deprecate-import--set-classic-decorator-from-ember',
    },
    {
      handler: 'silence',
      matchId: 'ember-data:deprecate-non-strict-relationships',
    },
  ],
});
