import RouteTemplate from 'ember-route-template'
import EmberAnchor from "ember-api-docs/components/ember-anchor";
import ApiIndexFilter from "ember-api-docs/components/api-index-filter";
import ClassFieldDescription from "ember-api-docs/components/class-field-description";
export default RouteTemplate(<template>{{!-- template-lint-disable no-action --}}
<EmberAnchor @a={{@controller.anchor}} />
<ApiIndexFilter @model={{@controller.model}} @filterData={{@controller.filterData}} as |filteredModel|>
  {{#each filteredModel.properties as |property|}}
    <ClassFieldDescription @type="property" @field={{property}} @model={{@controller.model}} @updateAnchor={{action "updateAnchor"}} />
  {{/each}}
</ApiIndexFilter>
</template>)