import ApiIndexFilter from 'ember-api-docs/components/api-index-filter';
import ClassFieldDescription from 'ember-api-docs/components/class-field-description';
<template>
  <ApiIndexFilter
    @model={{@model}}
    @filterData={{@filterData}}
    as |filteredModel|
  >
    {{#each filteredModel.events as |event|}}
      <ClassFieldDescription @type="event" @field={{event}} @model={{@model}} />
    {{/each}}
  </ApiIndexFilter>
</template>
