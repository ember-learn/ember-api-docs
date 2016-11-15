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
        <section>
          Show:
          <label class="access-checkbox">
            <input id=\"inherited-toggle\"
                   type=\"checkbox\"
                   checked={{showInherited}}
                   onchange={{action (mut showInherited) value=\"target.checked\"}}>
            Inherited
          </label>
          <label class="access-checkbox">
            <input id=\"protected-toggle\"
                   type=\"checkbox\"
                   checked={{showProtected}}
                   onchange={{action (mut showProtected) value=\"target.checked\"}}>
            Protected
          </label>
          <label class="access-checkbox">
            <input id=\"private-toggle\"
                   type=\"checkbox\"
                   checked={{showPrivate}}
                   onchange={{action (mut showPrivate) value=\"target.checked\"}}>
            Private
          </label>
          <label class="access-checkbox">
            <input id=\"deprecated-toggle\"
                   type=\"checkbox\"
                   checked={{showDeprecated}}
                   onchange={{action (mut showDeprecated) value=\"target.checked\"}}>
            Deprecated
          </label>
        </section>
        {{#each sectionData.sections as |section|}}
          {{log section}}
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
  assert.equal(this.$('.access-checkbox').length, 4, 'should show 4 filter checkboxes');
  assert.equal(this.$('.api-index-section-title').length, 3, 'should show 3 sections');
  assert.equal(this.$('.api-index-section-title:eq(0)').text(), 'Methods', 'should have methods as first section');
  assert.equal(this.$('.api-index-section-title:eq(1)').text(), 'Properties', 'should have properties as second section');
  assert.equal(this.$('.api-index-section-title:eq(2)').text(), 'Events', 'should have events as third section');
  assert.equal(this.$('.api-methods>li>a').text().trim(), 'doSomething', 'should display 1 method');
  assert.equal(this.$('.api-properties>li>a').text().trim(), 'isSomething', 'should display 1 property');
  assert.equal(this.$('.api-events>li>a').text().trim(), 'didSomething', 'should display 1 event');
});
