import RouteTemplate from 'ember-route-template'
import EmberAnchor from "ember-api-docs/components/ember-anchor";
import ApiIndexFilter from "ember-api-docs/components/api-index-filter";
import ClassFieldDescription from "ember-api-docs/components/class-field-description";
export default RouteTemplate(<template><EmberAnchor @a={{@controller.anchor}} />
<ApiIndexFilter @model={{@controller.model}} @filterData={{@controller.filterData}} as |filteredModel|>
  {{#each filteredModel.events as |event|}}
    <ClassFieldDescription @type="event" @field={{event}} @model={{@controller.model}} />
  {{/each}}
</ApiIndexFilter>
</template>)