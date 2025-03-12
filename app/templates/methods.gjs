{{! template-lint-disable no-action }}
<EmberAnchor @a={{this.anchor}} />
<ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |filteredModel|>
  {{#each filteredModel.methods as |method|}}
    <ClassFieldDescription @type="method" @field={{method}} @model={{this.model}} @updateAnchor={{action this.updateAnchor}} />
  {{/each}}
</ApiIndexFilter>
