import RouteTemplate from 'ember-route-template'
import eq from "ember-api-docs/helpers/eq";
import EmberDataLandingPage from "ember-api-docs/components/ember-data-landing-page";
import EmberLandingPage from "ember-api-docs/components/ember-landing-page";
export default RouteTemplate(<template>{{#if (eq @model.id "ember-data")}}
  <EmberDataLandingPage />
{{else}}
  <EmberLandingPage />
{{/if}}
</template>)