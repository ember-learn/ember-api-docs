import RouteTemplate from 'ember-route-template'
import EsHeader from "ember-styleguide/components/es-header";
import EsNavbar from "ember-styleguide/components/es-navbar";
import SearchInput from "ember-api-docs/components/search-input";
import EsFooter from "ember-styleguide/components/es-footer";
import HeadLayout from "ember-cli-head/components/head-layout";
import BasicDropdownWormhole from "ember-basic-dropdown/components/basic-dropdown-wormhole";
export default RouteTemplate(<template><EsHeader>
  <EsNavbar @links={{@controller.links}}>
    <SearchInput />
  </EsNavbar>
</EsHeader>
<main class="container">
  {{outlet}}
</main>
<EsFooter />

{{!-- required by ember-cli-meta-tags --}}
<HeadLayout />

<BasicDropdownWormhole /></template>)