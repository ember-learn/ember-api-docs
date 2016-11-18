import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('api-index', 'Integration | Component | api index', {
  integration: true
});

test('should display api index', function (assert) {
  let model = Ember.Object.create({
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
  this.set('myModel', model);

  // Template block usage:
  this.render(hbs`
      {{#api-index itemData=myModel as |sectionData|}}
        {{#each sectionData.sections as |section|}}
          <h2 class=\"api-index-section-title\">{{section.title}}</h2>
          {{#if section.items}}
            <ul class=\"{{section.class}}\">
              {{#each section.items as |item|}}
                <li>
                  {{#link-to \"item.route\"
                             sectionData.projectId
                             sectionData.projectVersion
                             sectionData.name
                             item.name
                             (query-params anchor=item.name)}}
                    {{item.name}}
                  {{/link-to}}
                </li>
              {{/each}}
            </ul>
            {{else}}
              No documented items
          {{/if}}
        {{/each}}
      {{/api-index}}
  `);
  assert.equal(this.$('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(this.$('.api-index-section-title:eq(0)').text(), 'Methods', 'should have methods as first section');
  assert.equal(this.$('.api-index-section-title:eq(1)').text(), 'Properties', 'should have properties as second section');
  assert.equal(this.$('.api-index-section-title:eq(2)').text(), 'Events', 'should have events as third section');
  assert.equal(this.$('.spec-method-list>li>a').text().trim(), 'doSomething', 'should display 1 method');
  assert.equal(this.$('.spec-property-list>li>a').text().trim(), 'isSomething', 'should display 1 property');
  assert.equal(this.$('.spec-event-list>li>a').text().trim(), 'didSomething', 'should display 1 event');
});

test('should display text when no methods', function (assert) {
  let model = Ember.Object.create({
    project: {
      id: 'lolwut'
    },
    projectVersion: {
      version: '2.9'
    },
    name: 'hai',
    methods: [],
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
  this.set('myModel', model);

  // Template block usage:
  this.render(hbs`
      {{#api-index itemData=myModel as |sectionData|}}
        {{#each sectionData.sections as |section|}}
          <h2 class=\"api-index-section-title\">{{section.title}}</h2>
          {{#if section.items}}
            <ul class=\"{{section.class}}\">
              {{#each section.items as |item|}}
                <li>
                  {{#link-to \"item.route\"
                             sectionData.projectId
                             sectionData.projectVersion
                             sectionData.name
                             item.name
                             (query-params anchor=item.name)}}
                    {{item.name}}
                  {{/link-to}}
                </li>
              {{/each}}
            </ul>
            {{else}}
              <p class="{{section.class}}">No documented items</p>
          {{/if}}
        {{/each}}
      {{/api-index}}
  `);
  assert.equal(this.$('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(this.$('.api-index-section-title:eq(0)').text(), 'Methods', 'should have methods as first section');
  assert.equal(this.$('.api-index-section-title:eq(1)').text(), 'Properties', 'should have properties as second section');
  assert.equal(this.$('.api-index-section-title:eq(2)').text(), 'Events', 'should have events as third section');
  assert.equal(this.$('.spec-method-list').text().trim(), 'No documented items', 'should display no items text');
  assert.equal(this.$('.spec-property-list').text().trim(), 'isSomething', 'should display 1 property');
  assert.equal(this.$('.spec-event-list').text().trim(), 'didSomething', 'should display 1 event');
});

test('should display api index with filter', function (assert) {
  let model = Ember.Object.create({
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
  this.set('myModel', model);
  let filterData = Ember.Object.create({
    showInherited: false,
    showProtected: false,
    showPrivate: false,
    showDeprecated: false
  });

  this.set('filterData', filterData);
  this.on('updateFilter', function (field, value) {
    filterData.set(field, value);
  });


  // Template block usage:
  this.render(hbs`
    {{#api-index-filter model=myModel filterData=filterData as |filteredModel|}}
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

      {{#api-index itemData=filteredModel as |sectionData|}}
        {{#each sectionData.sections as |section|}}
          <h2 class=\"api-index-section-title\">{{section.title}}</h2>
          {{#if section.items}}
            <ul class=\"{{section.class}}\">
              {{#each section.items as |item|}}
                <li>
                  {{#link-to \"item.route\"
                             sectionData.projectId
                             sectionData.projectVersion
                             sectionData.name
                             item.name
                             (query-params anchor=item.name)}}
                    {{item.name}}
                  {{/link-to}}
                </li>
              {{/each}}
            </ul>
            {{else}}
              No documented items
          {{/if}}
        {{/each}}
      {{/api-index}}
    {{/api-index-filter}}
  `);
  assert.equal(this.$('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(this.$('.api-index-section-title:eq(0)').text(), 'Methods', 'should have methods as first section');
  assert.equal(this.$('.api-index-section-title:eq(1)').text(), 'Properties', 'should have properties as second section');
  assert.equal(this.$('.api-index-section-title:eq(2)').text(), 'Events', 'should have events as third section');
  assert.equal(this.$('.spec-method-list').text().trim(), 'doSomething', 'should display 1 method');
  assert.equal(this.$('.spec-property-list').text().trim(), 'isSomething', 'should display 1 property');
  assert.equal(this.$('.spec-event-list').text().trim(), 'didSomething', 'should display 1 event');
});


test('should display inherited method when show inherited toggled on', function (assert) {
  let model = Ember.Object.create({
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
  this.set('myModel', model);
  let filterData = Ember.Object.create({
    showInherited: false,
    showProtected: false,
    showPrivate: false,
    showDeprecated: false
  });

  this.set('filterData', filterData);
  this.on('updateFilter', function (field) {
    filterData.set(field, !filterData.get(field));
  });

  this.render(hbs`
    {{#api-index-filter model=myModel filterData=filterData as |filteredModel|}}
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

      {{#api-index itemData=filteredModel as |sectionData|}}
        {{#each sectionData.sections as |section|}}
          <h2 class=\"api-index-section-title\">{{section.title}}</h2>
          {{#if section.items}}
            <ul class=\"{{section.class}}\">
              {{#each section.items as |item|}}
                <li>
                  {{#link-to "item.route"
                             sectionData.projectId
                             sectionData.projectVersion
                             sectionData.name
                             item.name
                             (query-params anchor=item.name)}}
                    {{item.name}}
                  {{/link-to}}
                </li>
              {{/each}}
            </ul>
            {{else}}
              No documented items
          {{/if}}
        {{/each}}
      {{/api-index}}
    {{/api-index-filter}}
  `);
  assert.equal(this.$('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(this.$('.api-index-section-title:eq(0)').text(), 'Methods', 'should have methods as first section');
  assert.equal(this.$('.api-index-section-title:eq(1)').text(), 'Properties', 'should have properties as second section');
  assert.equal(this.$('.api-index-section-title:eq(2)').text(), 'Events', 'should have events as third section');
  assert.equal(this.$('.spec-method-list>li>a').text().trim(), 'doSomething', 'should display 1 method');
  assert.equal(this.$('.spec-property-list>li>a').text().trim(), 'isSomething', 'should display 1 property');
  assert.equal(this.$('.spec-event-list>li>a').text().trim(), 'didSomething', 'should display 1 event');

  this.$('#inherited-toggle').click();

  assert.equal(this.$('.spec-method-list>li>a:eq(0)').text().trim(), 'doSomething', 'should display 1 public method');
  assert.equal(this.$('.spec-method-list>li>a:eq(1)').text().trim(), 'parentDoSomething', 'should display 1 inherited method');
  assert.equal(this.$('.spec-method-list>li>a').length, 2, 'should display 2 methods total');
});
