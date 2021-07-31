import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | table of contents', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('projectId', 'Ember');
    this.set('emberVersion', '2.4.3');

    this.set('classesIDs', ['Descriptor', 'Ember']);

    await render(hbs`{{table-of-contents showPrivateClasses=true
                                        projectid=projectId
                                        version=emberVersion
                                        classesIDs=classesIDs
                                        isShowingNamespaces=true
                    }}`);

    assert.dom(findAll('.toc-level-0 > a')[2]).hasText('Classes');
    assert
      .dom('.toc-level-1 li')
      .exists({ count: 2 }, 'We have two items to display');
    assert.dom(findAll('.toc-level-1 li')[0]).hasText('Descriptor');
    assert.dom(findAll('.toc-level-1 li')[1]).hasText('Ember');
  });

  test('Starts with underlying content visible', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('projectId', 'Ember');
    this.set('emberVersion', '2.4.3');

    this.set('moduleIDs', ['@ember/application', '@ember/array']);

    await render(hbs`{{table-of-contents showPrivateClasses=true
                                        projectid=projectId
                                        version=emberVersion
                                        moduleIDs=moduleIDs
                                        isShowingNamespaces=true
                    }}`);

    assert.dom(findAll('.toc-level-0 > a')[0]).hasText('Packages');
    assert
      .dom('.toc-level-1 li')
      .exists({ count: 2 }, 'We have two items to display');
    assert.dom('ol.toc-level-1').isVisible;
    assert.dom('.toc-level-1').hasClass('selected');
    assert.dom(findAll('.toc-level-1 li')[0]).hasText('@ember/application');
    assert.dom(findAll('.toc-level-1 li')[1]).hasText('@ember/array');
  });

  test('Underlying content hides once clicked', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('projectId', 'Ember');
    this.set('emberVersion', '2.4.3');

    this.set('moduleIDs', ['@ember/application', '@ember/array']);

    await render(hbs`{{table-of-contents showPrivateClasses=true
                                        projectid=projectId
                                        version=emberVersion
                                        moduleIDs=moduleIDs
                                        isShowingNamespaces=true
                    }}`);

    assert.dom(findAll('.toc-level-0 > a')[0]).hasText('Packages');
    assert.dom('ol.toc-level-1').isVisible;
    assert.dom('.toc-level-1').hasClass('selected');

    await click(document.querySelector('.toc-level-0 > a'));
    assert.dom('ol.toc-level-1').isNotVisible;
    assert.dom('.toc-level-1').doesNotHaveClass('selected');
  });

  test('Underlying content should be visible after 2 clicks', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('projectId', 'Ember');
    this.set('emberVersion', '2.4.3');

    this.set('moduleIDs', ['@ember/application', '@ember/array']);

    await render(hbs`{{table-of-contents showPrivateClasses=true
                                        projectid=projectId
                                        version=emberVersion
                                        moduleIDs=moduleIDs
                                        isShowingNamespaces=true
                    }}`);

    assert.dom(findAll('.toc-level-0 > a')[0]).hasText('Packages');
    assert.dom('ol.toc-level-1').isVisible;
    assert.dom('.toc-level-1').hasClass('selected');

    await click(document.querySelector('.toc-level-0 > a'));
    assert.dom('ol.toc-level-1').isNotVisible;
    assert.dom('.toc-level-1').doesNotHaveClass('selected');

    await click(document.querySelector('.toc-level-0 > a'));
    assert.dom('ol.toc-level-1').isVisible;
    assert.dom('.toc-level-1').hasClass('selected');
  });
});
