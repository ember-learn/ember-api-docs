import Ember from 'ember';
import _ from 'lodash';

const { inject, run } = Ember;

export default Ember.Route.extend({

  metaStore: Ember.inject.service(),

  projectService: Ember.inject.service('project'),
  headData: inject.service(),
  router: inject.service(),

  titleToken: function(model) {
    return model.get('version');
  },

  async model({project, project_version}) {
    await this.store.findRecord('project', project);
    const projectVersion = this.get('metaStore').getFullVersion(project, project_version);
    const id = `${project}-${projectVersion}`;
    this.get('projectService').setVersion(projectVersion);
    this.setCanonicalURL(params, projectVersion);
    return this.store.findRecord('project-version', id, { includes: 'project' });
  },

  setCanonicalURL({project_version}, versionModel) {
    if (project_version !== 'lts' && project_version !== 'release') {


      // run next is required so router.currentURL is present
      // but it can be performance issue
      // constructing the URL via href-to helper could be a good alternative
      run.next(() => {
        const currentURL = this.get('router.currentURL') || "";

        if (versionModel.get('isRelease')) {
          this.set('headData.canonicalURL', currentURL.replace(project_version, 'release'));
        } else if (versionModel.get('isLTS')) {
          this.set('headData.canonicalURL', currentURL.replace(project_version, 'lts'));
        } else {
          this.set('headData.canonicalURL', null);
        }

      });

    } else {
      this.set('headData.canonicalURL', null);
    }
  },

  // Using redirect instead of afterModel so transition succeeds and returns 30
  redirect(model, transition) {
    let classParams = transition.params['project-version.classes.class'];
    let moduleParams = transition.params['project-version.modules.module'];
    let namespaceParams = transition.params['project-version.namespaces.namespace'];
    if (!classParams && !moduleParams && !namespaceParams) {
      const namespaces = model.hasMany('namespaces').ids().sort();
      const namespace = _.last(namespaces[0].split("-"));
      return this.transitionTo('project-version.namespaces.namespace', model.get('project.id'), model.get('compactVersion'), namespace);
    }
  },

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('compactVersion')
    };
  },

  actions: {
    updateProject(project, ver /*, component */) {
      const projectVersionID = ver.compactVersion;
      let endingRoute, routeName;

      switch (routeName = this.router.currentRouteName) {
        case 'project-version.classes.class': {
          const className = this.modelFor(routeName).get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.classes.class.index': {
          const className = this.modelFor('project-version.classes.class').get('name');
          endingRoute = `classes/${className}`;
          break;
        }
        case 'project-version.modules.module.index': {
          const moduleName = this.paramsFor('project-version.modules.module').module;
          endingRoute = `modules/${moduleName}`;
          break;
        }
        case 'project-version.namespaces.namespace.index': {
          const namespaceName = this.paramsFor('project-version.namespaces.namespace').namespace;
          endingRoute = `namespaces/${namespaceName}`;
          break;
        }
        default:
          break;
      }

      if (endingRoute) {
        this.transitionTo(`/${project}/${projectVersionID}/${endingRoute}`);
      } else {
        this.transitionTo(`/${project}/${projectVersionID}`);
      }
    }
  }
});
