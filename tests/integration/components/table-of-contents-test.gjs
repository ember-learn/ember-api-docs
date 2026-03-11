import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const CLASSES = ['Descriptor', 'Ember'];
const MODULES = ['@ember/application', '@ember/array'];

module('Integration | Component | table of contents', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders classes', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('emberVersion', '2.4.3');
    this.set('classesIDs', CLASSES);

    await render(hbs`
      <TableOfContents
        @showPrivateClasses={{true}}
        @version={{this.emberVersion}}
        @classesIDs={{this.classesIDs}}
        @isShowingNamespaces={{true}}
      />
    `);

    const contentTitle = document.querySelector(
      '[data-test-toc-title="classes"]',
    );
    const contentReference = '.sub-table-of-contents';

    assert.dom(contentTitle).includesText('Classes');
    assert
      .dom(`${contentReference} li`)
      .exists({ count: 2 }, 'We have two items to display');
    assert.dom(findAll(`${contentReference} li`)[0]).hasText(CLASSES[0]);
    assert.dom(findAll(`${contentReference} li`)[1]).hasText(CLASSES[1]);
  });

  test('it renders packages', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('emberVersion', '2.4.3');
    this.set('moduleIDs', MODULES);

    await render(hbs`
      <TableOfContents
        @showPrivateClasses={{true}}
        @version={{this.emberVersion}}
        @moduleIDs={{this.moduleIDs}}
        @isShowingNamespaces={{true}}
      />
    `);

    const contentReference = '.sub-table-of-contents';
    const content = document.querySelector(contentReference);
    const contentTitle = document.querySelector(
      '[data-test-toc-title="packages"]',
    );

    assert.dom(contentTitle).includesText('Packages');
    assert
      .dom(`${contentReference} li`)
      .exists({ count: 2 }, 'We have two items to display');
    assert.dom(content).isVisible();
    assert.dom(findAll(`${contentReference} li`)[0]).hasText(MODULES[0]);
    assert.dom(findAll(`${contentReference} li`)[1]).hasText(MODULES[1]);
  });
});
