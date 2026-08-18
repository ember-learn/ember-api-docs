import pageTitle from 'ember-page-title/helpers/page-title';
import InHead from 'ember-api-docs/components/in-head';
import EsHeader from 'ember-styleguide/components/es-header';
import ApiSearch from 'ember-api-docs/components/api-search';
import EsFooter from 'ember-styleguide/components/es-footer';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import BasicDropdownWormhole from 'ember-basic-dropdown/components/basic-dropdown-wormhole';
import config from 'ember-api-docs/config/environment';

export default class Application extends Component {
  @service headData;
  @service router;
  @service prerender;

  get canonicalUrl() {
    let path = this.router.currentURL;
    let version = new RegExp(this.headData.compactVersion, 'g');
    return `${config.APP.domain}${path.replace(version, 'release')}`;
  }

  <template>
    {{pageTitle "Ember API Documentation"}}

    {{#if this.prerender.isPrerendering}}
      {{! template-lint-disable no-forbidden-elements}}
      <script type="x/boundary" id="prerender-body-start"></script>
    {{/if}}

    <InHead>
      {{! template-lint-disable no-forbidden-elements}}
      <link rel="dns-prefetch" href="{{this.headData.cdnDomain}}" />

      {{#if this.headData.description}}
        <meta name="description" content={{this.headData.description}} />
        <meta property="og:description" content={{this.headData.description}} />
      {{/if}}

      {{#unless this.headData.isRelease}}
        <link rel="canonical" href={{this.canonicalUrl}} />
      {{/unless}}
    </InHead>

    <EsHeader>
      <ApiSearch />
    </EsHeader>

    <main>
      {{outlet}}
    </main>

    <EsFooter />
    <BasicDropdownWormhole />

    {{#if this.prerender.isPrerendering}}
      {{! template-lint-disable no-forbidden-elements}}
      <script type="x/boundary" id="prerender-body-end"></script>
    {{/if}}
  </template>
}
