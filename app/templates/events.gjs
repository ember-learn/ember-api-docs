<EmberAnchor @a={{this.anchor}} />
<ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |filteredModel|>
  {{#each filteredModel.events as |event|}}
    <ClassFieldDescription @type="event" @field={{event}} @model={{this.model}} />
  {{/each}}
</ApiIndexFilter>
