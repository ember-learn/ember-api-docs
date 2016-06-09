import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-of-contents', 'Integration | Component | table of contents', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  this.set('projectID', 'Ember');
  this.set('emberVersion', '2.4.3');

  this.set('classesIDs', [
    'Descriptor',
    'Ember'
  ]);

  this.render(hbs`{{table-of-contents showPrivateClasses=true
                                      projectID=projectID
                                      version=emberVersion
                                      classesIDs=classesIDs
                  }}`);

  assert.equal(this.$('.toc-level-0 > a').text().trim(), 'Classes');
  assert.equal(this.$('.toc-level-1 li').length, 2, 'We have two items to display');
  assert.equal(this.$('.toc-level-1 li:first').text(), 'Descriptor');
  assert.equal(this.$('.toc-level-1 li:eq(1)').text(), 'Ember');
});
