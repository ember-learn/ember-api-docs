import Ember from 'ember';

export default Ember.Controller.extend({
  classesIDs: Ember.computed('model', function() {
    const classes = this.get('model').hasMany('classes');
    return Ember.A(classes.ids()).toArray().map(id => id.split('-').pop());
  }),

  projectVersionIDs: Ember.computed('model', function() {
    const projectID = this.get('model').belongsTo('project').id();
    const project = this.store.peekRecord('project', projectID);

    return project.hasMany('projectVersions').ids();
  })
});
