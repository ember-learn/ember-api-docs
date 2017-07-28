import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, findAll, find } from 'ember-native-dom-helpers';

moduleForComponent('api-index', 'Integration | Component | api index', {
  integration: true
});

test('should display api index', function (assert) {
  let model = EmberObject.create({
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
  assert.equal(findAll('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(findAll('.api-index-section-title')[0].textContent, 'Methods', 'should have methods as first section');
  assert.equal(findAll('.api-index-section-title')[1].textContent, 'Properties', 'should have properties as second section');
  assert.equal(findAll('.api-index-section-title')[2].textContent, 'Events', 'should have events as third section');
  assert.equal(find('.spec-method-list>li>a').textContent.trim(), 'doSomething', 'should display 1 method');
  assert.equal(find('.spec-property-list>li>a').textContent.trim(), 'isSomething', 'should display 1 property');
  assert.equal(find('.spec-event-list>li>a').textContent.trim(), 'didSomething', 'should display 1 event');
});

test('should display text when no methods', function (assert) {
  let model = EmberObject.create({
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
  assert.equal(findAll('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(findAll('.api-index-section-title')[0].textContent, 'Methods', 'should have methods as first section');
  assert.equal(findAll('.api-index-section-title')[1].textContent, 'Properties', 'should have properties as second section');
  assert.equal(findAll('.api-index-section-title')[2].textContent, 'Events', 'should have events as third section');
  assert.equal(find('.spec-method-list').textContent.trim(), 'No documented items', 'should display no items text');
  assert.equal(find('.spec-property-list').textContent.trim(), 'isSomething', 'should display 1 property');
  assert.equal(find('.spec-event-list').textContent.trim(), 'didSomething', 'should display 1 event');
});

test('should display api index with filter', function (assert) {
  let model = EmberObject.create({
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
  let filterData = EmberObject.create({
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
  assert.equal(findAll('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(findAll('.api-index-section-title')[0].textContent, 'Methods', 'should have methods as first section');
  assert.equal(findAll('.api-index-section-title')[1].textContent, 'Properties', 'should have properties as second section');
  assert.equal(findAll('.api-index-section-title')[2].textContent, 'Events', 'should have events as third section');
  assert.equal(find('.spec-method-list').textContent.trim(), 'doSomething', 'should display 1 method');
  assert.equal(find('.spec-property-list').textContent.trim(), 'isSomething', 'should display 1 property');
  assert.equal(find('.spec-event-list').textContent.trim(), 'didSomething', 'should display 1 event');
});


test('should display inherited method when show inherited toggled on', async function(assert) {
  let model = EmberObject.create({
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
  let filterData = EmberObject.create({
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
  assert.equal(findAll('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(findAll('.api-index-section-title')[0].textContent, 'Methods', 'should have methods as first section');
  assert.equal(findAll('.api-index-section-title')[1].textContent, 'Properties', 'should have properties as second section');
  assert.equal(findAll('.api-index-section-title')[2].textContent, 'Events', 'should have events as third section');
  assert.equal(find('.spec-method-list>li>a').textContent.trim(), 'doSomething', 'should display 1 method');
  assert.equal(find('.spec-property-list>li>a').textContent.trim(), 'isSomething', 'should display 1 property');
  assert.equal(find('.spec-event-list>li>a').textContent.trim(), 'didSomething', 'should display 1 event');

  await click('#inherited-toggle');

  assert.equal(findAll('.spec-method-list>li>a').length, 2, 'should display 2 methods total');
  assert.equal(findAll('.spec-method-list>li>a')[0].textContent.trim(), 'doSomething', 'should display 1 public method');
  assert.equal(findAll('.spec-method-list>li>a')[1].textContent.trim(), 'parentDoSomething', 'should display 1 inherited method');
});
