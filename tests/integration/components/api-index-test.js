import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | api index', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('should display api index', async function(assert) {
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
    await render(hbs`
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
    assert.dom('.api-index-section-title').exists({ count: 3 }, 'should show 3 sections');
    assert.dom(findAll('.api-index-section-title')[0]).hasText('Methods', 'should have methods as first section');
    assert.dom(findAll('.api-index-section-title')[1]).hasText('Properties', 'should have properties as second section');
    assert.dom(findAll('.api-index-section-title')[2]).hasText('Events', 'should have events as third section');
    assert.dom('.spec-method-list>li>a').hasText('doSomething', 'should display 1 method');
    assert.dom('.spec-property-list>li>a').hasText('isSomething', 'should display 1 property');
    assert.dom('.spec-event-list>li>a').hasText('didSomething', 'should display 1 event');
  });

  test('should display text when no methods', async function(assert) {
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
    await render(hbs`
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
    assert.dom('.api-index-section-title').exists({ count: 3 }, 'should show 3 sections');
    assert.dom(findAll('.api-index-section-title')[0]).hasText('Methods', 'should have methods as first section');
    assert.dom(findAll('.api-index-section-title')[1]).hasText('Properties', 'should have properties as second section');
    assert.dom(findAll('.api-index-section-title')[2]).hasText('Events', 'should have events as third section');
    assert.dom('.spec-method-list').hasText('No documented items', 'should display no items text');
    assert.dom('.spec-property-list').hasText('isSomething', 'should display 1 property');
    assert.dom('.spec-event-list').hasText('didSomething', 'should display 1 event');
  });

  test('should display api index with filter', async function(assert) {
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
    this.actions.updateFilter = function (field, value) {
      filterData.set(field, value);
    };


    // Template block usage:
    await render(hbs`
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
    assert.dom('.api-index-section-title').exists({ count: 3 }, 'should show 3 sections');
    assert.dom(findAll('.api-index-section-title')[0]).hasText('Methods', 'should have methods as first section');
    assert.dom(findAll('.api-index-section-title')[1]).hasText('Properties', 'should have properties as second section');
    assert.dom(findAll('.api-index-section-title')[2]).hasText('Events', 'should have events as third section');
    assert.dom('.spec-method-list').hasText('doSomething', 'should display 1 method');
    assert.dom('.spec-property-list').hasText('isSomething', 'should display 1 property');
    assert.dom('.spec-event-list').hasText('didSomething', 'should display 1 event');
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
    this.actions.updateFilter = function (field) {
      filterData.set(field, !filterData.get(field));
    };

    await render(hbs`
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
    assert.dom('.api-index-section-title').exists({ count: 3 }, 'should show 3 sections');
    assert.dom(findAll('.api-index-section-title')[0]).hasText('Methods', 'should have methods as first section');
    assert.dom(findAll('.api-index-section-title')[1]).hasText('Properties', 'should have properties as second section');
    assert.dom(findAll('.api-index-section-title')[2]).hasText('Events', 'should have events as third section');
    assert.dom('.spec-method-list>li>a').hasText('doSomething', 'should display 1 method');
    assert.dom('.spec-property-list>li>a').hasText('isSomething', 'should display 1 property');
    assert.dom('.spec-event-list>li>a').hasText('didSomething', 'should display 1 event');

    await click('#inherited-toggle');

    assert.dom('.spec-method-list>li>a').exists({ count: 2 }, 'should display 2 methods total');
    assert.dom(findAll('.spec-method-list>li>a')[0]).hasText('doSomething', 'should display 1 public method');
    assert.dom(findAll('.spec-method-list>li>a')[1]).hasText('parentDoSomething', 'should display 1 inherited method');
  });
});
