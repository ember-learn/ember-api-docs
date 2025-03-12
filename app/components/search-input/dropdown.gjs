<span class="ds-suggestions">
  {{#if this.noResults}}
    <SearchInput::DropdownHeader>
      No results found
    </SearchInput::DropdownHeader>
    <div class="algolia-docsearch-suggestion">
      <div class="algolia-docsearch-suggestion--noresults">
        <p>Try searching the <a href="https://www.emberjs.com/deprecations/" target="_deprecations">deprecations guide</a>.</p>
      </div>
    </div>

  {{else}}
    {{!-- Level 0 hierarchy --}}
    {{#each-in this._groupedResults as |lvl0section _lvl0results|}}
      {{!-- Dropdown header --}}

      <SearchInput::DropdownHeader>
        {{lvl0section}}
      </SearchInput::DropdownHeader>

      {{!-- Level 1 hierarchy --}}
      {{#each-in _lvl0results as |lvl1section _lvl1results|}}
        {{!-- Each result will be shown here --}}
        {{#each _lvl1results as |result index|}}
          <SearchInput::DropdownResult @result={{result}} @groupName={{lvl1section}} @groupPosition={{index}} />
        {{/each}}

      {{/each-in}}
    {{/each-in}}
  {{/if}}
</span>

{{yield}}
