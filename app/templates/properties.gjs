{{! template-lint-disable no-action }}
<EmberAnchor @a={{this.anchor}} />
<ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |filteredModel|>
  {{#each filteredModel.properties as |property|}}
    <ClassFieldDescription @type="property" @field={{property}} @model={{this.model}} @updateAnchor={{action "updateAnchor"}} />
  {{/each}}
</ApiIndexFilter>
