import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const TIMEOUT_FOR_ANIMATION = 600;
const CLASSES = ['Descriptor', 'Ember'];
const MODULES = ['@ember/application', '@ember/array'];

module('Integration | Component | table of contents', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
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
      '[data-test-toc-title="classes"]'
    );
    const contentReference = '.sub-table-of-contents';

    assert.dom(contentTitle).hasText('Classes');
    assert
      .dom(`${contentReference} li`)
      .exists({ count: 2 }, 'We have two items to display');
    assert.dom(findAll(`${contentReference} li`)[0]).hasText(CLASSES[0]);
    assert.dom(findAll(`${contentReference} li`)[1]).hasText(CLASSES[1]);
  });

  test('Starts with underlying content visible', async function (assert) {
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
      '[data-test-toc-title="classes"]'
    );

    assert.dom(contentTitle).hasText('Classes');
    assert.dom(content).hasClass('selected');
    assert
      .dom(`${contentReference} li`)
      .exists({ count: 2 }, 'We have two items to display');
    assert.dom(content).isVisible();
    assert.dom(findAll(`${contentReference} li`)[0]).hasText(MODULES[0]);
    assert.dom(findAll(`${contentReference} li`)[1]).hasText(MODULES[1]);
  });

  skip('Underlying content hides once clicked', async function (assert) {
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

    const contentTitle = document.querySelector(
      '[data-test-toc-title="packages"]'
    );
    const contentReference = '.sub-table-of-content';
    const content = document.querySelector(contentReference);

    assert.dom(contentTitle).hasText('Packages');
    assert.dom(content).hasClass('selected');
    assert.dom(content).isVisible();

    await click(contentTitle);

    const done = assert.async();
    setTimeout(() => {
      assert.dom(content).isNotVisible();
      assert.dom(content).doesNotHaveClass('selected');
      done();
    }, TIMEOUT_FOR_ANIMATION);
  });

  skip('Underlying content should be visible after 2 clicks', async function (assert) {
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

    const titleButton = document.querySelector(
      '[data-test-toc-title="packages"]'
    );
    const contentReference = '.sub-table-of-contents';
    const content = document.querySelector(contentReference);

    assert.dom(titleButton).hasText('Packages');
    assert.dom(content).hasClass('selected');
    assert.dom(content).isVisible();

    await click(titleButton);

    const done1 = assert.async();

    setTimeout(async () => {
      assert.dom(content).isNotVisible();
      assert.dom(content).doesNotHaveClass('selected');

      await click(titleButton);

      const done2 = assert.async();

      setTimeout(() => {
        assert.dom(content).isVisible();
        assert.dom(content).hasClass('selected');
        done2();
      }, TIMEOUT_FOR_ANIMATION);

      done1();
    }, TIMEOUT_FOR_ANIMATION);
  });
});
