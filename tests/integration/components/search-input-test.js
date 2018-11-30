import { module, test, only } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, waitFor, pauseTest } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { task } from 'ember-concurrency';
import { get } from '@ember/object';

module('Card | article', function(hooks) {
  setupRenderingTest(hooks);

  only('embedded format renders', async function(assert) {

    let searchInput = this.owner.lookup('component:search-input');

    // TODO: find out if there is a better way to "mock" a function like this
    // TODO: consider using a search service
    // eslint-disable-next-line require-yield
    searchInput.__proto__.search = task(function * (query) {
      console.log('query', query);
      let res = {"hits":[{"file":"packages/ember-routing/lib/system/route.js","line":1505,"module":"@ember/routing","class":"Route","name":"model","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"model"},"objectID":"180742570","_highlightResult":{"name":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1505,"module":"@ember/routing","class":"Route","name":"model","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"model"},"objectID":"168075472","_highlightResult":{"name":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1879,"module":"@ember/routing","class":"Route","name":"modelFor","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"modelFor"},"objectID":"180742650","_highlightResult":{"name":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1879,"module":"@ember/routing","class":"Route","name":"modelFor","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"modelFor"},"objectID":"168075552","_highlightResult":{"name":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]}}}}],"nbHits":4,"page":0,"nbPages":1,"hitsPerPage":15,"processingTimeMS":1,"exhaustiveNbHits":true,"query":"model","params":"query=model&hitsPerPage=15&restrictSearchableAttributes=%5B%22hierarchy.lvl0%22%2C%22hierarchy.lvl1%22%2C%22hierarchy.lvl2%22%5D&tagFilters=%5B%22version%3A3.5.1%22%5D&facetFilters=%5B%22access%3A-private%22%5D"};

      const results = get(res, 'hits');
      return get(this, '_results')
        .clear()
        .addObjects(results);
    })

    await this.render(hbs`{{search-input}}`);

    fillIn('[data-test-search-input]', 'model')

    await waitFor('.ds-suggestion');

    await pauseTest();

    assert.dom('.algolia-docsearch-suggestion--content a').hasAttribute('href', '/api/ember/3.5/classes/Route/methods/model?anchor=model')
  });
});
