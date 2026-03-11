import eq from 'ember-api-docs/helpers/eq';
import EmberDataLandingPage from 'ember-api-docs/components/ember-data-landing-page';
import EmberLandingPage from 'ember-api-docs/components/ember-landing-page';
<template>
  {{#if (eq @model.project "ember-data")}}
    <EmberDataLandingPage />
  {{else}}
    <EmberLandingPage @version={{@model.version}} />
  {{/if}}
</template>
