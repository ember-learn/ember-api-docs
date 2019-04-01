import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | search input', function(hooks) {
  setupRenderingTest(hooks);

  test('search hits display content', async function(assert) {

    let searchService = this.owner.lookup('service:search');

    set(searchService, 'doSearch', () => {
      return [{"file":"packages/ember-routing/lib/system/route.js","line":1505,"module":"@ember/routing","class":"Route","name":"model","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"model"},"objectID":"180742570","_highlightResult":{"name":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1505,"module":"@ember/routing","class":"Route","name":"model","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"model"},"objectID":"168075472","_highlightResult":{"name":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1879,"module":"@ember/routing","class":"Route","name":"modelFor","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"modelFor"},"objectID":"180742650","_highlightResult":{"name":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1879,"module":"@ember/routing","class":"Route","name":"modelFor","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"modelFor"},"objectID":"168075552","_highlightResult":{"name":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]}}}}];
    });

    await this.render(hbs`{{search-input}}`);

    await fillIn('#search-input', 'model');

    await waitFor('.ds-suggestion');

    assert.dom('.algolia-docsearch-suggestion--content').exists({count: 4});
  });

  test('no search hits display no results', async function(assert) {

    let searchService = this.owner.lookup('service:search');

    set(searchService, 'doSearch', () => {
      return [];
    });

    await this.render(hbs`{{search-input}}`);

    await fillIn('#search-input', 'model');

    assert.dom('.algolia-docsearch-suggestion--noresults').exists();
  });
});
