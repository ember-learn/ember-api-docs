import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import TableOfContents from 'ember-api-docs/components/table-of-contents';

const CLASSES = ['Descriptor', 'Ember'];
const MODULES = ['@ember/application', '@ember/array'];

module('Integration | Component | table of contents', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders classes', async function (assert) {
    const emberVersion = '2.4.3';
    const classesIDs = CLASSES;

    await render(
      <template>
        <TableOfContents
          @showPrivateClasses={{true}}
          @version={{emberVersion}}
          @classesIDs={{classesIDs}}
          @isShowingNamespaces={{true}}
        />
      </template>,
    );

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
    const emberVersion = '2.4.3';
    const moduleIDs = MODULES;

    await render(
      <template>
        <TableOfContents
          @showPrivateClasses={{true}}
          @version={{emberVersion}}
          @moduleIDs={{moduleIDs}}
          @isShowingNamespaces={{true}}
        />
      </template>,
    );

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
