/* eslint-disable ember/no-classic-components, ember/no-get, ember/require-tagless-components, prettier/prettier */
import { classNames, attributeBindings, tagName } from '@ember-decorators/component';
import { get } from '@ember/object';
import Component from '@ember/component';
import { A } from '@ember/array';
import DropdownHeader from "ember-api-docs/components/search-input/dropdown-header";
import DropdownResult from "ember-api-docs/components/search-input/dropdown-result";

@tagName('span')
@classNames('ds-dropdown-menu', 'ds-with-1')
@attributeBindings('role')
export default class Dropdown extends Component {<template><span class="ds-suggestions">
  {{#if this.noResults}}
    <DropdownHeader>
      No results found
    </DropdownHeader>
    <div class="algolia-docsearch-suggestion">
      <div class="algolia-docsearch-suggestion--noresults">
        <p>Try searching the <a href="https://www.emberjs.com/deprecations/" target="_deprecations">deprecations guide</a>.</p>
      </div>
    </div>

  {{else}}
    {{!-- Level 0 hierarchy --}}
    {{#each-in this._groupedResults as |lvl0section _lvl0results|}}
      {{!-- Dropdown header --}}

      <DropdownHeader>
        {{lvl0section}}
      </DropdownHeader>

      {{!-- Level 1 hierarchy --}}
      {{#each-in _lvl0results as |lvl1section _lvl1results|}}
        {{!-- Each result will be shown here --}}
        {{#each _lvl1results as |result index|}}
          <DropdownResult @result={{result}} @groupName={{lvl1section}} @groupPosition={{index}} />
        {{/each}}

      {{/each-in}}
    {{/each-in}}
  {{/if}}
</span>

{{yield}}
</template>
  // Public API
  role = 'listbox';

  isVisible = false;

  // show
  // Massage data to make it easier for displaying on the template
  // Returned object:
  /**
   *  {
   *    lvl0Key: {
   *      lvl1Key: algoliaHit
   *    }
   *  }
   */

  get _groupedResults() {
    let results = get(this, 'results');
    if (!results.length) {
      return {};
    }

    const lvl0Group = results.reduce((previous, current) => {
      // Remap all lowercase usages of 'guides' to 'Guides'
      let lvl0 = get(current, 'hierarchy.lvl0');
      // If lvl0 doesn't exist in the resulting object, create the array
      if (!previous[lvl0]) {
        previous[lvl0] = A();
      }
      // Insert the current item into the resulting object.
      previous[lvl0].addObject(current);
      return previous;
    }, {});

    /*
    lvl0Group = {
      lvl0key: algoliaHit
    }
    */

    // Iterate over every lvl0 group, group by lvl1
    return Object.keys(lvl0Group).reduce((lvl0Result, lvl0Key) => {
      // Inject lvl1 grouped results into lvl0
      lvl0Result[lvl0Key] = lvl0Group[lvl0Key].reduce(
        (lvl1Result, lvl1Item) => {
          // lvl1 is sometimes null. Normalise to a string.
          const lvl1Value = get(lvl1Item, 'hierarchy.lvl1');
          const lvl1Key = lvl1Value ? lvl1Value : lvl0Key;

          if (!lvl1Result[lvl1Key]) {
            lvl1Result[lvl1Key] = A();
          }

          lvl1Result[lvl1Key].addObject(lvl1Item);
          return lvl1Result;
        },
        {}
      );

      return lvl0Result;
    }, {});
  }
}
