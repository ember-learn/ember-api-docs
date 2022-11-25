self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember.globals-resolver' },
    { handler: 'silence', matchId: 'ember-component.is-visible' },
    { handler: 'silence', matchId: 'manager-capabilities.modifiers-3-13' },
    { handler: 'silence', matchId: 'this-property-fallback' },
  ],
};
