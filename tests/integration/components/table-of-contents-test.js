import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('table-of-contents', 'Integration | Component | table of contents', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  this.set('projectId', 'Ember');
  this.set('emberVersion', '2.4.3');

  this.set('classesIDs', [
    'Descriptor',
    'Ember'
  ]);

  this.render(hbs`{{table-of-contents showPrivateClasses=true
                                      projectid=projectId
                                      version=emberVersion
                                      classesIDs=classesIDs
                  }}`);

  assert.equal(findAll('.toc-level-0 > a')[2].textContent.trim(), 'Classes');
  assert.equal(findAll('.toc-level-1 li').length, 2, 'We have two items to display');
  assert.equal(findAll('.toc-level-1 li')[0].textContent.trim(), 'Descriptor');
  assert.equal(findAll('.toc-level-1 li')[1].textContent.trim(), 'Ember');
});
