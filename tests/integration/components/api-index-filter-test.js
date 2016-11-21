import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('api-index-filter', 'Integration | Component | api index filter', {
  integration: true
});

const model = Ember.Object.create({
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


test('clicking inherited shows inherited methods', function(assert) {
  let filterData = Ember.Object.create({
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

  this.$('#inherited-toggle').click();
  assert.equal(this.$('.method-name:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.method-name:eq(1)').text().trim(), 'parentDoSomething', 'should display 1 inherited method');
  assert.equal(this.$('.method-name').length, 2, 'should display 2 methods total');
});

test('clicking private shows private methods', function(assert) {
  let filterData = Ember.Object.create({
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

  this.$('#private-toggle').click();
  assert.equal(this.$('.method-name:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.method-name:eq(1)').text().trim(), 'doSomethingPrivate', 'should display 1 private method');
  assert.equal(this.$('.method-name').length, 2, 'should display 2 methods total');
});

test('clicking private and inherited shows both methods', function(assert) {
  let filterData = Ember.Object.create({
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

  this.$('#private-toggle').click();
  this.$('#inherited-toggle').click();
  assert.equal(this.$('.method-name:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.method-name:eq(1)').text().trim(), 'doSomethingPrivate', 'should display 1 private method');
  assert.equal(this.$('.method-name:eq(2)').text().trim(), 'parentDoSomething', 'should display 1 inherited method');
  assert.equal(this.$('.method-name').length, 3, 'should display 3 methods total');
});


test('clicking all toggles shows all methods', function(assert) {
  let filterData = Ember.Object.create({
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

  this.$('#private-toggle').click();
  this.$('#inherited-toggle').click();
  this.$('#protected-toggle').click();
  this.$('#deprecated-toggle').click();
  assert.equal(this.$('.method-name:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.method-name:eq(1)').text().trim(), 'doSomethingDeprecated', 'should display 1 deprecated method');
  assert.equal(this.$('.method-name:eq(2)').text().trim(), 'doSomethingPrivate', 'should display 1 private method');
  assert.equal(this.$('.method-name:eq(3)').text().trim(), 'doSomethingProtected', 'should display 1 protected method');
  assert.equal(this.$('.method-name:eq(4)').text().trim(), 'parentDoSomething', 'should display 1 inherited method');
  assert.equal(this.$('.method-name').length, 5, 'should display all methods');
});


test('clicking all toggles off should only show public', function(assert) {
  let filterData = Ember.Object.create({
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

  assert.equal(this.$('.method-name:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.method-name:eq(1)').text().trim(), 'doSomethingDeprecated', 'should display 1 deprecated method');
  assert.equal(this.$('.method-name:eq(2)').text().trim(), 'doSomethingPrivate', 'should display 1 private method');
  assert.equal(this.$('.method-name:eq(3)').text().trim(), 'doSomethingProtected', 'should display 1 protected method');
  assert.equal(this.$('.method-name:eq(4)').text().trim(), 'parentDoSomething', 'should display 1 inherited method');
  assert.equal(this.$('.method-name').length, 5, 'should display all methods');

  this.$('#private-toggle').click();
  this.$('#inherited-toggle').click();
  this.$('#protected-toggle').click();
  this.$('#deprecated-toggle').click();

  assert.equal(this.$('.method-name:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.method-name').length, 1, 'should display all methods');

});
