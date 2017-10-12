import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, findAll } from 'ember-native-dom-helpers';

moduleForComponent('api-index-filter', 'Integration | Component | api index filter', {
  integration: true
});

const model = EmberObject.create({
  project: {
    id: 'lolwut'
  },
  projectVersion: {
    version: '2.9'
  },
  name: 'hai',
  methods: [
    {
      name: 'doSomething',
      route: 'do-something'
    },
    {
      name: 'parentDoSomething',
      route: 'parent-do-something',
      inherited: true
    },
    {
      name: 'doSomethingPrivate',
      route: 'do-something-private',
      access: 'private'
    },
    {
      name: 'doSomethingProtected',
      route: 'do-something-protected',
      access: 'protected'
    },
    {
      name: 'doSomethingDeprecated',
      route: 'do-something-deprecated',
      deprecated: true
    }
  ],
  properties: [
    {
      name: 'isSomething',
      route: 'is-something'
    }
  ],
  events: [
    {
      name: 'didSomething',
      route: 'did-something'
    }
  ]
});


test('clicking inherited shows inherited methods', async function(assert) {
  let filterData = EmberObject.create({
    showInherited: false,
    showProtected: false,
    showPrivate: false,
    isDeprecated: false
  });

  this.set('model', model);
  this.set('filterData', filterData);
  this.on('updateFilter', function (field) {
    filterData.set(field, !filterData.get(field));
  });

  this.render(hbs`
    {{#api-index-filter model=model filterData=filterData as |myModel|}}
        <section>
          Show:
          <label class="access-checkbox">
            <input id="inherited-toggle"
                   type="checkbox"
                   checked="{{filterData.showInherited}}"
                   onchange={{action "updateFilter" "showInherited"}}>
            Inherited
          </label>
          <label class="access-checkbox">
            <input id=\"protected-toggle\"
                   type=\"checkbox\"
                   checked={{filterData.showProtected}}
                   onchange={{action "updateFilter" \"showProtected\"}}>
            Protected
          </label>
          <label class="access-checkbox">
            <input id=\"private-toggle\"
                   type=\"checkbox\"
                   checked={{sectionData.showPrivate}}
                   onchange={{action \"updateFilter\" \"showPrivate\"}}>
            Private
          </label>
          <label class="access-checkbox">
            <input id=\"deprecated-toggle\"
                   type=\"checkbox\"
                   checked=\"{{sectionData.showDeprecated}}\"
                   onchange={{action \"updateFilter\" \"showDeprecated\"}}>
          </label>
        </section>
        <h2>Methods</h2>
        {{#each myModel.methods as |method|}}
          <p class=\"method-name\">{{method.name}}</p>
        {{/each}}
    {{/api-index-filter}}
  `);

  await click('#inherited-toggle');
  assert.dom('.method-name').exists({ count: 2 }, 'should display 2 methods total');
  assert.dom(findAll('.method-name')[0]).hasText('doSomething', 'should display 1 public method');
  assert.dom(findAll('.method-name')[1]).hasText('parentDoSomething', 'should display 1 inherited method');
});

test('clicking private shows private methods', async function(assert) {
  let filterData = EmberObject.create({
    showInherited: false,
    showProtected: false,
    showPrivate: false,
    showDeprecated: false
  });

  this.set('model', model);
  this.set('filterData', filterData);
  this.on('updateFilter', function (field) {
    filterData.set(field, !filterData.get(field));
  });

  this.render(hbs`
    {{#api-index-filter model=model filterData=filterData updateFilter=(action "updateFilter") as |myModel|}}
        <section>
          Show:
          <label class="access-checkbox">
            <input id="inherited-toggle"
                   type="checkbox"
                   checked="{{filterData.showInherited}}"
                   onchange={{action "updateFilter" "showInherited"}}>
            Inherited
          </label>
          <label class="access-checkbox">
            <input id=\"protected-toggle\"
                   type=\"checkbox\"
                   checked={{filterData.showProtected}}
                   onchange={{action "updateFilter" \"showProtected\"}}>
            Protected
          </label>
          <label class="access-checkbox">
            <input id="private-toggle"
                   type="checkbox"
                   checked={{filterData.showPrivate}}
                   onchange={{action "updateFilter" "showPrivate"}}>
            Private
          </label>
          <label class="access-checkbox">
            <input id=\"deprecated-toggle\"
                   type=\"checkbox\"
                   checked=\"{{sectionData.showDeprecated}}\"
                   onchange={{action \"updateFilter\" \"showDeprecated\"}}>
          </label>
        </section>
        <h2>Methods</h2>
        {{#each myModel.methods as |method|}}
          <p class=\"method-name\">{{method.name}}</p>
        {{/each}}
    {{/api-index-filter}}
  `);

  await click('#private-toggle');
  assert.dom('.method-name').exists({ count: 2 }, 'should display 2 methods total');
  assert.dom(findAll('.method-name')[0]).hasText('doSomething', 'should display 1 public method');
  assert.dom(findAll('.method-name')[1]).hasText('doSomethingPrivate', 'should display 1 private method');
});

test('clicking private and inherited shows both methods', async function(assert) {
  let filterData = EmberObject.create({
    showInherited: false,
    showProtected: false,
    showPrivate: false,
    showDeprecated: false
  });

  this.set('model', model);
  this.set('filterData', filterData);
  this.on('updateFilter', function (field, value) {
    filterData.set(field, value);
  });

  this.render(hbs`
    {{#api-index-filter model=model filterData=filterData as |myModel|}}
        <section>
          Show:
          <label class="access-checkbox">
            <input id="inherited-toggle"
                   type="checkbox"
                   checked="{{filterData.showInherited}}"
                   onchange={{action "updateFilter" "showInherited"}}>
            Inherited
          </label>
          <label class="access-checkbox">
            <input id=\"protected-toggle\"
                   type=\"checkbox\"
                   checked={{filterData.showProtected}}
                   onchange={{action "updateFilter" \"showProtected\"}}>
            Protected
          </label>
          <label class="access-checkbox">
            <input id="private-toggle"
                   type="checkbox"
                   checked={{filterData.showPrivate}}
                   onchange={{action "updateFilter" "showPrivate"}}>
            Private
          </label>
          <label class="access-checkbox">
            <input id=\"deprecated-toggle\"
                   type=\"checkbox\"
                   checked=\"{{sectionData.showDeprecated}}\"
                   onchange={{action \"updateFilter\" \"showDeprecated\"}}>
          </label>
        </section>
        <h2>Methods</h2>
        {{#each myModel.methods as |method|}}
          <p class=\"method-name\">{{method.name}}</p>
        {{/each}}
    {{/api-index-filter}}
  `);

  await click('#private-toggle');
  await click('#inherited-toggle');
  assert.dom('.method-name').exists({ count: 3 }, 'should display 3 methods total');
  assert.dom(findAll('.method-name')[0]).hasText('doSomething', 'should display 1 public method');
  assert.dom(findAll('.method-name')[1]).hasText('doSomethingPrivate', 'should display 1 private method');
  assert.dom(findAll('.method-name')[2]).hasText('parentDoSomething', 'should display 1 inherited method');
});


test('clicking all toggles shows all methods', async function(assert) {
  let filterData = EmberObject.create({
    showInherited: false,
    showProtected: false,
    showPrivate: false,
    showDeprecated: false
  });

  this.set('model', model);
  this.set('filterData', filterData);
  this.on('updateFilter', function (field) {
    filterData.set(field, !filterData.get(field));
  });

  this.render(hbs`
    {{#api-index-filter model=model filterData=filterData as |myModel|}}
        <section>
          Show:
          <label class="access-checkbox">
            <input id="inherited-toggle"
                   type="checkbox"
                   checked="{{filterData.showInherited}}"
                   onchange={{action "updateFilter" "showInherited"}}>
            Inherited
          </label>
          <label class="access-checkbox">
            <input id="protected-toggle"
                   type="checkbox"
                   checked={{filterData.showProtected}}
                   onchange={{action "updateFilter" "showProtected"}}>
            Protected
          </label>
          <label class="access-checkbox">
            <input id="private-toggle"
                   type="checkbox"
                   checked={{filterData.showPrivate}}
                   onchange={{action "updateFilter" "showPrivate"}}>
            Private
          </label>
          <label class="access-checkbox">
            <input id="deprecated-toggle"
                   type="checkbox"
                   checked="{{filterData.showDeprecated}}"
                   onchange={{action "updateFilter" "showDeprecated"}}>
          </label>
        </section>
        <h2>Methods</h2>
        {{#each myModel.methods as |method|}}
          <p class=\"method-name\">{{method.name}}</p>
        {{/each}}
    {{/api-index-filter}}
  `);

  await click('#private-toggle');
  await click('#inherited-toggle');
  await click('#protected-toggle');
  await click('#deprecated-toggle');
  assert.dom('.method-name').exists({ count: 5 }, 'should display all methods');
  assert.dom(findAll('.method-name')[0]).hasText('doSomething', 'should display 1 public method');
  assert.dom(findAll('.method-name')[1]).hasText('doSomethingDeprecated', 'should display 1 deprecated method');
  assert.dom(findAll('.method-name')[2]).hasText('doSomethingPrivate', 'should display 1 private method');
  assert.dom(findAll('.method-name')[3]).hasText('doSomethingProtected', 'should display 1 protected method');
  assert.dom(findAll('.method-name')[4]).hasText('parentDoSomething', 'should display 1 inherited method');
});


test('clicking all toggles off should only show public', async function(assert) {
  let filterData = EmberObject.create({
    showInherited: true,
    showProtected: true,
    showPrivate: true,
    showDeprecated: true
  });

  this.set('model', model);
  this.set('filterData', filterData);
  this.on('updateFilter', function (field) {
    filterData.set(field, !filterData.get(field));
  });

  this.render(hbs`
    {{#api-index-filter model=model filterData=filterData as |myModel|}}
        <section>
          Show:
          <label class="access-checkbox">
            <input id="inherited-toggle"
                   type="checkbox"
                   checked="{{filterData.showInherited}}"
                   onchange={{action "updateFilter" "showInherited"}}>
            Inherited
          </label>
          <label class="access-checkbox">
            <input id="protected-toggle"
                   type="checkbox"
                   checked={{filterData.showProtected}}
                   onchange={{action "updateFilter" "showProtected"}}>
            Protected
          </label>
          <label class="access-checkbox">
            <input id="private-toggle"
                   type="checkbox"
                   checked={{filterData.showPrivate}}
                   onchange={{action "updateFilter" "showPrivate"}}>
            Private
          </label>
          <label class="access-checkbox">
            <input id="deprecated-toggle"
                   type="checkbox"
                   checked="{{filterData.showDeprecated}}"
                   onchange={{action "updateFilter" "showDeprecated"}}>
          </label>
        </section>
        <h2>Methods</h2>
        {{#each myModel.methods as |method|}}
          <p class=\"method-name\">{{method.name}}</p>
        {{/each}}
    {{/api-index-filter}}
  `);

  assert.dom('.method-name').exists({ count: 5 }, 'should display all methods');
  assert.dom(findAll('.method-name')[0]).hasText('doSomething', 'should display 1 public method');
  assert.dom(findAll('.method-name')[1]).hasText('doSomethingDeprecated', 'should display 1 deprecated method');
  assert.dom(findAll('.method-name')[2]).hasText('doSomethingPrivate', 'should display 1 private method');
  assert.dom(findAll('.method-name')[3]).hasText('doSomethingProtected', 'should display 1 protected method');
  assert.dom(findAll('.method-name')[4]).hasText('parentDoSomething', 'should display 1 inherited method');

  await click('#private-toggle');
  await click('#inherited-toggle');
  await click('#protected-toggle');
  await click('#deprecated-toggle');

  assert.dom('.method-name').exists({ count: 1 }, 'should display all methods');
  assert.dom(findAll('.method-name')[0]).hasText('doSomething', 'should display 1 public method');

});
