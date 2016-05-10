import DS from 'ember-data';
import Ember from 'ember';

const {attr, belongsTo} = DS;

export default DS.Model.extend({
  name: attr(),
  methods: attr(),
  properties: attr(),
  events: attr(),
  description: attr(),
  ogDescription: attr(),
  parentClass: belongsTo('class', {async: true, inverse: null}),
  projectVersion: belongsTo('project-version'),
  // hack until i add this data to cloudant
  project: Ember.computed('projectVersion.id', function() {
    let id = this.get('projectVersion.id').split('-').slice(0, -1).join('-');
    return this.store.peekRecord('project', id);
  })
});
