import ApiIndexFilter from 'ember-api-docs/components/api-index-filter';
import ClassFieldDescription from 'ember-api-docs/components/class-field-description';
<template>
  <ApiIndexFilter
    @model={{@model}}
    @filterData={{@filterData}}
    as |filteredModel|
  >
    {{#each filteredModel.methods as |method|}}
      <ClassFieldDescription
        @type="method"
        @field={{method}}
        @model={{@model}}
      />
    {{/each}}
  </ApiIndexFilter>
</template>
