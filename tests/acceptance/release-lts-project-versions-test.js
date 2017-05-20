import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { click } from 'ember-native-dom-helpers';
import Ember from 'ember';

const {$} = Ember;

moduleForAcceptance('Acceptance | release lts project versions');

test('release url param', function(assert) {
  visit('/ember/release/namespaces/Ember');

  let checkLinks = (label, selector, versionString) => {
    return $('.attributes a').toArray().forEach(el => {
      let href = el.attributes.href.value;
      if (href[0] === '/') {

        assert.ok(href.indexOf(versionString) > -1, `${label} link contains ${versionString} - ${href}`);
      }
    });
  };

  let checkSidebarLinks = versionString => {
    return checkLinks('side',
      '.toc-level-1.modules li:first-child a, .toc-level-1.namespaces li:first-child a, .toc-level-1.classes li:first-child a',
      versionString);
  };

  let checkAttributeLinks = versionString => {
    return checkLinks('attributes', '.attributes a', versionString);
  };

  let checkIndexListLinks = versionString => {
    return checkLinks('index-list', '.api-index-filter a', versionString);
  };

  let checkActiveClass = versionString => {
    return assert.ok($('.tabbed-layout__menu li:first-child').hasClass('tabbed-layout__menu__item_selected'), `active class works with ${versionString}`)
  };

  andThen(function() {
    assert.equal(currentURL(), '/ember/release/namespaces/Ember');

    checkSidebarLinks('release');
    checkActiveClass('release');
    checkIndexListLinks('release');
    checkAttributeLinks('release');

    return click('.tabbed-layout__menu__item:nth-child(2)'); //clicking methods
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember/release/namespaces/Ember/methods?anchor=');
    return visit('/ember-data/release/namespaces/DS');
  });

  andThen(() => {
    assert.equal(currentURL(), '/ember-data/release/namespaces/DS');

    checkSidebarLinks('release');
    checkActiveClass('release');
    checkIndexListLinks('release');
    checkAttributeLinks('release');

    return visit('/ember/lts/namespaces/Ember');
  });

  return andThen(() => {
    assert.equal(currentURL(), '/ember/lts/namespaces/Ember');

    checkSidebarLinks('lts');
    checkActiveClass('lts');
    checkIndexListLinks('lts');
    checkAttributeLinks('lts');

    return this;
  });
});
