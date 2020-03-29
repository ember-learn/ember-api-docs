self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchId: "transition-state" },
    { handler: "throw", matchId: "deprecate-router-events" }
  ]
};
