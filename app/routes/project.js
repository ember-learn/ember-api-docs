import Ember from 'ember';
import semverCompare from 'npm:semver-compare';
import _ from 'lodash/lodash';
import ResetScrollPositionMixin from 'ember-api-docs/mixins/reset-scroll-position';


export default Ember.Route.extend(ResetScrollPositionMixin, {
  model(params) {
    return this.store.find('project', params.project);
  },
  afterModel(project /*, transition */) {
    return project.get('projectVersions').then(versions => {
      const last = versions.toArray().sort((a, b) => {
        const a_ver = _.last(a.get('id').split("-"));
        const b_ver = _.last(b.get('id').split("-"));
        return semverCompare(a_ver, b_ver);
      })[versions.length - 1];
      return this.transitionTo('project-version', last);
    });
  }
});
