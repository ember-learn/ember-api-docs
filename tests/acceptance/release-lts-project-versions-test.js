import { test } from 'qunit';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';
import { click, visit } from 'ember-native-dom-helpers';
import Ember from 'ember';

const { $ } = Ember;

moduleForAcceptance('Acceptance | release lts project versions');

test('release url param', async function(assert) {
  await visit('/ember/release/namespaces/Ember');

  const checkLinks = (label, selector, versionString) => {
    return $(selector).toArray().forEach(el => {
      const href = el.attributes.href.value;
      if (href[0] === '/') {

        assert.ok(href.indexOf(versionString) > -1, `${label} link contains ${versionString} - ${href}`);
      }
    });
  };

  const checkSidebarLinks = versionString => {
    return checkLinks('side',
      '.toc-level-1.modules li:first-child a, .toc-level-1.namespaces li:first-child a, .toc-level-1.classes li:first-child a',
      versionString);
  };

  const checkAttributeLinks = version => checkLinks('attributes', '.attributes a', version);
  const checkIndexListLinks = version => checkLinks('index-list', '.api-index-filter a', version);
  const checkActiveClass = version => assert.ok($('.tabbed-layout__menu a:first-child').hasClass('tabbed-layout__menu__item_selected'), `active class works with ${version}`);

  assert.equal(currentURL(), '/ember/release/namespaces/Ember');

  checkSidebarLinks('release');
  checkActiveClass('release');
  checkIndexListLinks('release');
  checkAttributeLinks('release');

  await click('.tabbed-layout__menu__item:nth-child(2)'); //clicking methods
  assert.equal(currentURL(), '/ember/release/namespaces/Ember/methods?anchor=');
  await visit('/ember-data/release/namespaces/DS');

  assert.equal(currentURL(), '/ember-data/release/namespaces/DS');

  checkSidebarLinks('release');
  checkActiveClass('release');
  checkIndexListLinks('release');
  checkAttributeLinks('release');

  await visit('/ember/lts/namespaces/Ember');

  assert.equal(currentURL(), '/ember/lts/namespaces/Ember');
  checkSidebarLinks('lts');
  checkActiveClass('lts');
  checkIndexListLinks('lts');
  checkAttributeLinks('lts');

});
