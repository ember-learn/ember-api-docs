{{! template-lint-disable no-action }}
<div class='search-input'>
  <input
    id='search-input'
    type='search'
    value={{this.value}}
    oninput={{perform this.search value='target.value'}}
    onfocus={{action 'onfocus'}}
    onblur={{action 'onblur'}}
    placeholder='Search'
    data-test-search-input
  />
  {{! Search results dropdown }}
  <EmberTether
    @target='#search-input'
    @targetAttachment='bottom left'
    @attachment='top left'
    @constraints={{this._resultTetherConstraints}}
    @class='ds-dropdown-results'
  >
    <SearchInput::Dropdown
      @isVisible={{this._focused}}
      @results={{this.searchService.results}}
      @noResults={{if
        (and
          (and (not this.searchService.search.isRunning) this.queryIsPresent)
          (eq this.searchService.results.length 0)
        )
        true
        false
      }}
    />
  </EmberTether>
</div>