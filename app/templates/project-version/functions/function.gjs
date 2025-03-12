import RouteTemplate from 'ember-route-template'
import ClassFieldDescription from "ember-api-docs/components/class-field-description";
export default RouteTemplate(<template><h1 class="module-name">Function</h1>
<ClassFieldDescription @type="method" @field={{@model.fn}} @model={{@model.fnModule}} />
</template>)