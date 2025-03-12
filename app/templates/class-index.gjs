<ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |filteredModel|>
  <ApiIndex @itemData={{filteredModel}} @classNames="api__index__content" as |sectionData|>
    {{#each sectionData.sections as |section|}}
      <h3 class="api-index-section-title">{{section.title}}</h3>
      {{#if section.items}}
        <ul class="{{section.class}}">
          {{#each section.items as |item|}}
            <li data-test-item={{item.name}}>
              <LinkTo
                @route="{{this.parentName}}{{section.routeSuffix}}"
                @models={{array
                  @model.project.id
                  @model.projectVersion.compactVersion
                  @model.name item.name
                }}
                @query={{hash anchor=item.name}}
              >
                {{item.name}}
              </LinkTo>
            </li>
          {{/each}}
        </ul>
      {{else}}
        <p>No documented items</p>
      {{/if}}
    {{/each}}
  </ApiIndex>
</ApiIndexFilter>
