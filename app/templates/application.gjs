import pageTitle from "ember-page-title/helpers/page-title";
import HeadLayout from "ember-cli-head/components/head-layout";
import EsHeader from "ember-styleguide/components/es-header";
import ApiSearch from "ember-api-docs/components/api-search";
import EsFooter from "ember-styleguide/components/es-footer";
import BasicDropdownWormhole from "ember-basic-dropdown/components/basic-dropdown-wormhole";
<template>{{pageTitle "Ember API Documentation"}}

<HeadLayout />

<EsHeader>
  <ApiSearch />
</EsHeader>

<main>
  {{outlet}}
</main>

<EsFooter />
<BasicDropdownWormhole />
</template>