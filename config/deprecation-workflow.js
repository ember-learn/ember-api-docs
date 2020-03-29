self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "transition-state" },
    { handler: "throw", matchId: "deprecate-router-events" }
  ]
};
