<EsHeader>
  <EsNavbar @links={{this.links}}>
    <SearchInput />
  </EsNavbar>
</EsHeader>
<main class="container">
  {{outlet}}
</main>
<EsFooter />

{{!-- required by ember-cli-meta-tags --}}
<HeadLayout />

<BasicDropdownWormhole />