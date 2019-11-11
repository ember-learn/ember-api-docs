self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchId: "ember-env.old-extend-prototypes" },
    { handler: "throw", matchId: "ember-routing.route-router" },
    { handler: "throw", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "throw", matchId: "ember-console.deprecate-logger" }
  ]
};
