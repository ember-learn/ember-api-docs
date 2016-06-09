import Ember from 'ember';

const { computed, inject, RSVP } = Ember;

export default Ember.Component.extend({
  store: inject.service(),

  shownClassesIDs: computed('showPrivateClasses', 'classesIDs.[]', function() {
    if (this.get('showPrivateClasses')) {
      return RSVP.resolve(this.get('classesIDs'));
    } else {
      const projectID = this.get('projectID');
      const version = this.get('version');
      return RSVP.allSettled(this.get('classesIDs').map((classID) => {
        return this.get('store').find('class', `${projectID}-${version}-${classID}`);
      })).then((classes) => {
        return classes.filter((klass) => {
          return klass.state === "fulfilled" && klass.value.get('access') !== "private";
        }).map(klass => klass.value.get('name'));
      });
    }
  }),

  actions: {
    toggle() {
      this.$('ol.toc-level-1').slideToggle(200);
    }
  }
});
