import { tracked } from '@glimmer/tracking';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | api index filter', function (hooks) {
  setupRenderingTest(hooks);

  const createModel = () => ({
    project: {
      id: 'lolwut',
    },
    projectVersion: {
      version: '2.9',
    },
    name: 'hai',
    file: 'my-class',
    parentClass: {
      get(key) {
        return key === 'file' ? 'my-class' : undefined;
      },
      file: 'my-class',
    },
    methods: [
      {
        name: 'doSomething',
        route: 'do-something',
        file: 'my-class',
      },
      {
        name: 'doSomething',
        route: 'do-something',
        file: 'my-parent-class',
      },
      {
        name: 'parentDoSomething',
        route: 'parent-do-something',
        inherited: true,
      },
      {
        name: 'doSomethingPrivate',
        route: 'do-something-private',
        access: 'private',
      },
      {
        name: 'doSomethingProtected',
        route: 'do-something-protected',
        access: 'protected',
      },
      {
        name: 'doSomethingDeprecated',
        route: 'do-something-deprecated',
        deprecated: true,
      },
    ],
    properties: [
      {
        name: 'isSomething',
        route: 'is-something',
      },
    ],
    events: [
      {
        name: 'didSomething',
        route: 'did-something',
      },
    ],
  });

  test('clicking inherited shows inherited methods', async function (assert) {
    class FilterData {
      @tracked showInherited = false;
      @tracked showProtected = false;
      @tracked showPrivate = false;
      @tracked showDeprecated = false;
    }

    this.model = createModel();
    this.filterData = new FilterData();
    this.updateFilter = (field) => {
      this.filterData[field] = !this.filterData[field];
    };

    await render(hbs`
      <ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |myModel|>
          <section>
            Show:
            <label class="access-checkbox">
              <input id="inherited-toggle"
                     type="checkbox"
                     checked={{this.filterData.showInherited}}
                     onchange={{fn this.updateFilter "showInherited"}}>
              Inherited
            </label>
            <label class="access-checkbox">
              <input id="protected-toggle"
                     type="checkbox"
                     checked={{this.filterData.showProtected}}
                     onchange={{fn this.updateFilter "showProtected"}}>
              Protected
            </label>
            <label class="access-checkbox">
              <input id="private-toggle"
                     type="checkbox"
                     checked={{this.filterData.showPrivate}}
                     onchange={{fn this.updateFilter "showPrivate"}}>
              Private
            </label>
            <label class="access-checkbox">
              <input id="deprecated-toggle"
                     type="checkbox"
                     checked={{this.filterData.showDeprecated}}
                     onchange={{fn this.updateFilter "showDeprecated"}}>
            </label>
          </section>
          <h2>Methods</h2>
          {{#each myModel.methods as |method|}}
            <p class="method-name">{{method.name}}</p>
          {{/each}}
      </ApiIndexFilter>
    `);

    await click('#inherited-toggle');
    assert
      .dom('.method-name')
      .exists({ count: 2 }, 'should display 2 methods total');
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
    assert
      .dom(findAll('.method-name')[1])
      .hasText('parentDoSomething', 'should display 1 inherited method');
  });

  test('clicking private shows private methods', async function (assert) {
    class FilterData {
      @tracked showInherited = false;
      @tracked showProtected = false;
      @tracked showPrivate = false;
      @tracked showDeprecated = false;
    }

    this.model = createModel();
    this.filterData = new FilterData();
    this.updateFilter = (field) => {
      this.filterData[field] = !this.filterData[field];
    };

    await render(hbs`
      <ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |myModel|>
          <section>
            Show:
            <label class="access-checkbox">
              <input id="inherited-toggle"
                     type="checkbox"
                     checked={{this.filterData.showInherited}}
                     onchange={{fn this.updateFilter "showInherited"}}>
              Inherited
            </label>
            <label class="access-checkbox">
              <input id="protected-toggle"
                     type="checkbox"
                     checked={{this.filterData.showProtected}}
                     onchange={{fn this.updateFilter "showProtected"}}>
              Protected
            </label>
            <label class="access-checkbox">
              <input id="private-toggle"
                     type="checkbox"
                     checked={{this.filterData.showPrivate}}
                     onchange={{fn this.updateFilter "showPrivate"}}>
              Private
            </label>
            <label class="access-checkbox">
              <input id="deprecated-toggle"
                     type="checkbox"
                     checked={{this.filterData.showDeprecated}}
                     onchange={{fn this.updateFilter "showDeprecated"}}>
            </label>
          </section>
          <h2>Methods</h2>
          {{#each myModel.methods as |method|}}
            <p class="method-name">{{method.name}}</p>
          {{/each}}
      </ApiIndexFilter>
    `);

    await click('#private-toggle');
    assert
      .dom('.method-name')
      .exists({ count: 2 }, 'should display 2 methods total');
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
    assert
      .dom(findAll('.method-name')[1])
      .hasText('doSomethingPrivate', 'should display 1 private method');
  });

  test('clicking private and inherited shows both methods', async function (assert) {
    class FilterData {
      @tracked showInherited = false;
      @tracked showProtected = false;
      @tracked showPrivate = false;
      @tracked showDeprecated = false;
    }

    this.model = createModel();
    this.filterData = new FilterData();
    this.updateFilter = (field) => {
      this.filterData[field] = !this.filterData[field];
    };

    await render(hbs`
      <ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |myModel|>
          <section>
            Show:
            <label class="access-checkbox">
              <input id="inherited-toggle"
                     type="checkbox"
                     checked={{this.filterData.showInherited}}
                     onchange={{fn this.updateFilter "showInherited"}}>
              Inherited
            </label>
            <label class="access-checkbox">
              <input id="protected-toggle"
                     type="checkbox"
                     checked={{this.filterData.showProtected}}
                     onchange={{fn this.updateFilter "showProtected"}}>
              Protected
            </label>
            <label class="access-checkbox">
              <input id="private-toggle"
                     type="checkbox"
                     checked={{this.filterData.showPrivate}}
                     onchange={{fn this.updateFilter "showPrivate"}}>
              Private
            </label>
            <label class="access-checkbox">
              <input id="deprecated-toggle"
                     type="checkbox"
                     checked={{this.filterData.showDeprecated}}
                     onchange={{fn this.updateFilter "showDeprecated"}}>
            </label>
          </section>
          <h2>Methods</h2>
          {{#each myModel.methods as |method|}}
            <p class="method-name">{{method.name}}</p>
          {{/each}}
      </ApiIndexFilter>
    `);

    await click('#private-toggle');
    await click('#inherited-toggle');
    assert
      .dom('.method-name')
      .exists({ count: 3 }, 'should display 3 methods total');
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
    assert
      .dom(findAll('.method-name')[1])
      .hasText('doSomethingPrivate', 'should display 1 private method');
    assert
      .dom(findAll('.method-name')[2])
      .hasText('parentDoSomething', 'should display 1 inherited method');
  });

  test('clicking all toggles shows all methods', async function (assert) {
    class FilterData {
      @tracked showInherited = false;
      @tracked showProtected = false;
      @tracked showPrivate = false;
      @tracked showDeprecated = false;
    }

    this.model = createModel();
    this.filterData = new FilterData();
    this.updateFilter = (field) => {
      this.filterData[field] = !this.filterData[field];
    };

    await render(hbs`
      <ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |myModel|>
          <section>
            Show:
            <label class="access-checkbox">
              <input id="inherited-toggle"
                     type="checkbox"
                     checked={{this.filterData.showInherited}}
                     onchange={{fn this.updateFilter "showInherited"}}>
              Inherited
            </label>
            <label class="access-checkbox">
              <input id="protected-toggle"
                     type="checkbox"
                     checked={{this.filterData.showProtected}}
                     onchange={{fn this.updateFilter "showProtected"}}>
              Protected
            </label>
            <label class="access-checkbox">
              <input id="private-toggle"
                     type="checkbox"
                     checked={{this.filterData.showPrivate}}
                     onchange={{fn this.updateFilter "showPrivate"}}>
              Private
            </label>
            <label class="access-checkbox">
              <input id="deprecated-toggle"
                     type="checkbox"
                     checked={{this.filterData.showDeprecated}}
                     onchange={{fn this.updateFilter "showDeprecated"}}>
            </label>
          </section>
          <h2>Methods</h2>
          {{#each myModel.methods as |method|}}
            <p class="method-name">{{method.name}}</p>
          {{/each}}
      </ApiIndexFilter>
    `);

    await click('#private-toggle');
    await click('#inherited-toggle');
    await click('#protected-toggle');
    await click('#deprecated-toggle');
    assert
      .dom('.method-name')
      .exists({ count: 5 }, 'should display all methods');
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
    assert
      .dom(findAll('.method-name')[1])
      .hasText('doSomethingDeprecated', 'should display 1 deprecated method');
    assert
      .dom(findAll('.method-name')[2])
      .hasText('doSomethingPrivate', 'should display 1 private method');
    assert
      .dom(findAll('.method-name')[3])
      .hasText('doSomethingProtected', 'should display 1 protected method');
    assert
      .dom(findAll('.method-name')[4])
      .hasText('parentDoSomething', 'should display 1 inherited method');
  });

  test('clicking all toggles off should only show public', async function (assert) {
    class FilterData {
      @tracked showInherited = true;
      @tracked showProtected = true;
      @tracked showPrivate = true;
      @tracked showDeprecated = true;
    }

    this.model = createModel();
    this.filterData = new FilterData();
    this.updateFilter = (field) => {
      this.filterData[field] = !this.filterData[field];
    };

    await render(hbs`
      <ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |myModel|>
          <section>
            Show:
            <label class="access-checkbox">
              <input id="inherited-toggle"
                     type="checkbox"
                     checked={{this.filterData.showInherited}}
                     onchange={{fn this.updateFilter "showInherited"}}>
              Inherited
            </label>
            <label class="access-checkbox">
              <input id="protected-toggle"
                     type="checkbox"
                     checked={{this.filterData.showProtected}}
                     onchange={{fn this.updateFilter "showProtected"}}>
              Protected
            </label>
            <label class="access-checkbox">
              <input id="private-toggle"
                     type="checkbox"
                     checked={{this.filterData.showPrivate}}
                     onchange={{fn this.updateFilter "showPrivate"}}>
              Private
            </label>
            <label class="access-checkbox">
              <input id="deprecated-toggle"
                     type="checkbox"
                     checked={{this.filterData.showDeprecated}}
                     onchange={{fn this.updateFilter "showDeprecated"}}>
            </label>
          </section>
          <h2>Methods</h2>
          {{#each myModel.methods as |method|}}
            <p class="method-name">{{method.name}}</p>
          {{/each}}
      </ApiIndexFilter>
    `);

    assert
      .dom('.method-name')
      .exists({ count: 5 }, 'should display all methods');
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
    assert
      .dom(findAll('.method-name')[1])
      .hasText('doSomethingDeprecated', 'should display 1 deprecated method');
    assert
      .dom(findAll('.method-name')[2])
      .hasText('doSomethingPrivate', 'should display 1 private method');
    assert
      .dom(findAll('.method-name')[3])
      .hasText('doSomethingProtected', 'should display 1 protected method');
    assert
      .dom(findAll('.method-name')[4])
      .hasText('parentDoSomething', 'should display 1 inherited method');

    await click('#private-toggle');
    await click('#inherited-toggle');
    await click('#protected-toggle');
    await click('#deprecated-toggle');

    assert
      .dom('.method-name')
      .exists({ count: 1 }, 'should display all methods');
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
  });

  test('should show only local method implementation when duplicates', async function (assert) {
    class FilterData {
      @tracked showInherited = true;
      @tracked showProtected = false;
      @tracked showPrivate = false;
      @tracked showDeprecated = false;
    }

    this.model = createModel();
    this.filterData = new FilterData();

    await render(hbs`
      <ApiIndexFilter @model={{this.model}} @filterData={{this.filterData}} as |myModel|>
          <h2>Methods</h2>
          {{#each myModel.methods as |method|}}
            <p class="method-name">{{method.name}}</p>
          {{/each}}
      </ApiIndexFilter>
    `);
    assert
      .dom('.method-name')
      .exists(
        { count: 2 },
        'should display only the local method and the parent method with a different name',
      );
    assert
      .dom(findAll('.method-name')[0])
      .hasText('doSomething', 'should display 1 public method');
    assert
      .dom(findAll('.method-name')[1])
      .hasText('parentDoSomething', 'should display 1 inherited method');
  });
});
