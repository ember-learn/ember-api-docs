import RouteTemplate from 'ember-route-template'
import ApiIndexFilter from "ember-api-docs/components/api-index-filter";
import ApiIndex from "ember-api-docs/components/api-index";
import { LinkTo } from "@ember/routing";
import { array, hash } from "@ember/helper";
export default RouteTemplate(<template><ApiIndexFilter @model={{@controller.model}} @filterData={{@controller.filterData}} as |filteredModel|>
  <ApiIndex @itemData={{filteredModel}} @classNames="api__index__content" as |sectionData|>
    {{#each sectionData.sections as |section|}}
      <h3 class="api-index-section-title">{{section.title}}</h3>
      {{#if section.items}}
        <ul class="{{section.class}}">
          {{#each section.items as |item|}}
            <li data-test-item={{item.name}}>
              <LinkTo @route="{{@controller.parentName}}{{section.routeSuffix}}" @models={{array @model.project.id @model.projectVersion.compactVersion @model.name item.name}} @query={{hash anchor=item.name}}>
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
</template>)