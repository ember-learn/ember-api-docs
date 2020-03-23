self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "transition-state" },
    { handler: "silence", matchId: "deprecate-router-events" },
    { handler: "silence", matchId: "ember-native-dom-helpers-click" }
  ]
};
