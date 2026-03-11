{{#if (eq @model.project "ember-data")}}
  <EmberDataLandingPage />
{{else}}
  <EmberLandingPage @version={{@model.version}}/>
{{/if}}
