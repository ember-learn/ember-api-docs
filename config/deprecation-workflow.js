self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "log", matchId: "ember-env.old-extend-prototypes" },
    { handler: "throw", matchId: "ember-routing.route-router" },
    { handler: "log", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "log", matchId: "ember-console.deprecate-logger" }
  ]
};
