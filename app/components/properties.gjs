import ApiIndexFilter from "ember-api-docs/components/api-index-filter";
import ClassFieldDescription from "ember-api-docs/components/class-field-description";
<template><ApiIndexFilter @model={{@model}} @filterData={{@filterData}} as |filteredModel|>
  {{#each filteredModel.properties as |property|}}
    <ClassFieldDescription @type="property" @field={{property}} @model={{@model}} />
  {{/each}}
</ApiIndexFilter>
</template>