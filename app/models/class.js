import DS from 'ember-data';
import Ember from 'ember';

const {computed} = Ember;
const {attr, belongsTo} = DS;

export default DS.Model.extend({
  name: attr(),
  methods: attr(),
  properties: attr(),
  access: attr(),
  events: attr(),
  description: attr(),
  ogDescription: attr(),
  extends: attr(),
  uses: attr(),
  file: attr(),
  line: attr(),
  module: attr(),
  parentClass: belongsTo('class', {async: true, inverse: null}),
  projectVersion: belongsTo('project-version', {inverse: 'classes'}),
  project: computed('projectVersion.id', function() {
    let id = this.get('projectVersion.id').split('-').slice(0, -1).join('-');
    return this.store.peekRecord('project', id);
  })

});
