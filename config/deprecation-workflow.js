self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember.globals-resolver" },
    { handler: "silence", matchId: "ember-component.is-visible" }
  ]
};
