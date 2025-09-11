import Component from '@glimmer/component';
import { service } from '@ember/service';
import { LinkTo } from '@ember/routing';
import { array } from '@ember/helper';
import { htmlSafe } from '@ember/template';
import eq from 'ember-truth-helpers/helpers/eq';
import { on } from '@ember/modifier';
import Search from './search';

const SearchResultGroupHeader = <template>
  <div class='search-results--group-header' ...attributes>
    {{yield}}
  </div>
</template>;

const SearchResultLinkContents = <template>
  <span class='screen-reader-text'>{{@groupName}}</span>
  {{htmlSafe @result._highlightResult.hierarchy.lvl2.value}}
  {{! Do these ever display in API Docs? }}
  {{#if @result._highlightResult.hierarchy.lvl3}}
    <span aria-hidden='true'> › </span>
    {{htmlSafe @result._highlightResult.hierarchy.lvl3.value}}
  {{/if}}
  {{#if @result._highlightResult.hierarchy.lvl4}}
    <span aria-hidden='true'> › </span>
    {{htmlSafe @result._highlightResult.hierarchy.lvl4.value}}
  {{/if}}
</template>;

const SearchResult = class SearchResult extends Component {
  @service router;

  get module() {
    if (this.args.result?.project) {
      return this.args.result?.project;
    }
    let module = this.args.result?.module;
    if (module.includes('ember-data')) {
      return 'ember-data';
    }
    return 'ember';
  }

  get version() {
    let versionTag = (this.args.result?._tags ?? []).find(
      (_tag) => _tag.indexOf('version:') > -1,
    );
    let versionSegments = versionTag.replace('version:', '').split('.');
    return `${versionSegments[0]}.${versionSegments[1]}`;
  }

  urlForClass = (result) => {
    return `${this.router.urlFor('project-version.classes.class', this.module, this.version, result.class)}#${result.name}`;
  };

  <template>
    <div class='search-results--result'>
      <div class='search-results--subcategory-column' aria-hidden='true'>
        {{#if (eq @groupPosition 0)}}
          {{@groupName}}
        {{/if}}
      </div>
      <div class='search-results--content'>
        {{#if @result.static}}
          <LinkTo
            @route='project-version.functions.function'
            @models={{array
              this.module
              this.version
              @result.class
              @result.name
            }}
            {{on 'click' @closeMenu}}
            data-test-search-result
          >
            <SearchResultLinkContents
              @result={{@result}}
              @groupName={{@groupName}}
            />
          </LinkTo>
        {{else}}
          <a href='{{this.urlForClass @result}}' data-test-search-result>
            <SearchResultLinkContents
              @result={{@result}}
              @groupName={{@groupName}}
            />
          </a>
        {{/if}}
      </div>
    </div>
  </template>
};

const SearchResults = class SearchBox extends Component {
  get groupedResults() {
    let results = this.args.results;
    if (!results.length) {
      return {};
    }

    const lvl0Group = results.reduce((previous, current) => {
      // Remap all lowercase usages of 'guides' to 'Guides'
      let lvl0 = current?.hierarchy?.lvl0;
      // If lvl0 doesn't exist in the resulting object, create the array
      if (!previous[lvl0]) {
        previous[lvl0] = [];
      }
      // Insert the current item into the resulting object.
      previous[lvl0].push(current);
      return previous;
    }, {});

    /*
    lvl0Group = {
      lvl0key: algoliaHit
    }
    */
    // https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/#response-information
    // Iterate over every lvl0 group, group by lvl1
    return Object.keys(lvl0Group).reduce((lvl0Result, lvl0Key) => {
      // Inject lvl1 grouped results into lvl0
      lvl0Result[lvl0Key] = lvl0Group[lvl0Key].reduce(
        (lvl1Result, lvl1Item) => {
          // lvl1 is sometimes null. Normalise to a string.
          const lvl1Value = lvl1Item?.hierarchy?.lvl1;
          const lvl1Key = lvl1Value ? lvl1Value : lvl0Key;

          if (!lvl1Result[lvl1Key]) {
            lvl1Result[lvl1Key] = [];
          }

          lvl1Result[lvl1Key].push(lvl1Item);
          return lvl1Result;
        },
        {},
      );

      return lvl0Result;
    }, {});
  }

  <template>
    {{#each-in this.groupedResults as |lvl0section _lvl0results|}}
      <SearchResultGroupHeader aria-hidden='true'>
        {{lvl0section}}
      </SearchResultGroupHeader>

      {{#each-in _lvl0results as |lvl1section _lvl1results|}}
        {{#each _lvl1results as |result index|}}
          <SearchResult
            @result={{result}}
            @groupName={{lvl1section}}
            @groupPosition={{index}}
            @closeMenu={{@closeMenu}}
            data-test-search-result
          />
        {{/each}}
      {{/each-in}}
    {{/each-in}}
  </template>
};

export default class ApiSearch extends Component {
  @service('search') searchService;
  @service('project') projectService;

  <template>
    <Search @searchService={{this.searchService}}>
      <:searchInputScreenReaderLabel>Search v{{this.projectService.version}}
        of the API Docs. Results will update as you type.</:searchInputScreenReaderLabel>
      <:instructions>Type to search v{{this.projectService.version}}
        of the API Docs</:instructions>
      <:results as |results closeMenu|>
        <SearchResults @results={{results}} @closeMenu={{closeMenu}} />
      </:results>
    </Search>
  </template>
}
