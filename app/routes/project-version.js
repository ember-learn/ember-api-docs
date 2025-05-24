import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import semverCompare from 'semver-compare';
import getFullVersion from 'ember-api-docs/utils/get-full-version';
import getLastVersion from 'ember-api-docs/utils/get-last-version';
import config from 'ember-api-docs/config/environment';

export default class ProjectVersionRoute extends Route {
  @service
  fastboot;

  @service
  headData;

  @service
  metaStore;

  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service store;

  @service('project')
  projectService;

  async model({ project, project_version }) {
    let projectObj = await this.store.findRecord('project', project);
    let projectVersion = getFullVersion(
      project_version,
      project,
      projectObj,
      this.metaStore
    );
    let id = `${project}-${projectVersion}`;
    this.projectService.setUrlVersion(project_version);
    this.projectService.setVersion(projectVersion);
    return this.store.findRecord('project-version', id, {
      includes: 'project',
    });
  }

  // Using redirect instead of afterModel so transition succeeds and returns 307
  redirect(model, transition) {
    const lookupParams = (routeName) => {
      let route = transition.routeInfos.find(({ name }) => name === routeName);
      return route && route.params;
    };
    this._gatherHeadDataFromVersion(
      model,
      lookupParams('project-version').project_version
    );

    let classParams = lookupParams('project-version.classes.class');
    let moduleParams = lookupParams('project-version.modules.module');
    let namespaceParams = lookupParams('project-version.namespaces.namespace');
    let functionParams = lookupParams('project-version.functions.function');
    let transitionVersion = this.projectService.getUrlVersion();
    if (
      moduleParams?.module === 'ember-data-overview' &&
      semverCompare(transitionVersion, '4.7') < 0 &&
      transitionVersion !== 'release' // infinite redirects happen without this line
    ) {
      return this.router.transitionTo('project-version.index');
    }
    if (!classParams && !moduleParams && !namespaceParams && !functionParams) {
      // if there is no class, module, or namespace specified...
      let latestVersion = getLastVersion(
        model.get('project.content').hasMany('projectVersions').ids()
      );
      let isLatestVersion =
        transitionVersion === latestVersion || transitionVersion === 'release';
      let shouldConvertPackages = semverCompare(model.version, '2.16') < 0;
      if (!shouldConvertPackages || isLatestVersion) {
        // ... and the transition version is the latest release,
        // display the landing page at

        // ember-data if @main declaration exists for ember-data-overview
        let versionId = model.get('id');
        let modules = model
          .hasMany('modules')
          .ids()
          .map((id) => id.substring(versionId.length + 1));
        if (
          model.get('project.id') === 'ember-data' &&
          modules.indexOf('ember-data-overview') !== -1
        ) {
          return this.router.transitionTo(
            'project-version.modules.module',
            model.get('project.id'),
            transitionVersion,
            'ember-data-overview'
          );
        }

        // ember / ember-cli / ember-data if no @main declaration exists for ember-data-overview
        return this.router.transitionTo('project-version.index');
      } else {
        // else go to the version specified
        let moduleRevs = this.metaStore.getEncodedModulesFromProjectRev(
          model.get('id')
        );
        let module = this.getFirstModule(moduleRevs);
        return this.router.transitionTo(
          'project-version.modules.module',
          model.get('project.id'),
          transitionVersion,
          module
        );
      }
    }
  }

  _gatherHeadDataFromVersion(model, projectVersion) {
    this.headData.isRelease = projectVersion === 'release';
    this.headData.compactVersion = model.get('compactVersion');
    this.headData.urlVersion = projectVersion;
    if (!this.headData.isRelease) {
      let request = this.fastboot.request;
      let href = this.fastboot.isFastBoot
        ? `${config.APP.domain}/${request.path}`
        : window.location.href;
      let version = new RegExp(model.get('compactVersion'), 'g');
      let canonicalUrl = href.replace(version, 'release');
      this.headData.canonicalUrl = canonicalUrl;
    }
  }

  serialize(model) {
    return {
      project: model.get('project.id'),
      project_version: model.get('compactVersion'),
    };
  }

  /**
     splits the first encoded revision string in the list and takes the string after the version (which is the encoded name), then decodes the result.
     */
  getFirstModule(moduleRevs) {
    let encodedModule = moduleRevs[0]
      .split('-')
      .reduce((result, val, index, arry) => {
        if (val === this.projectService.version) {
          return arry.slice(index + 1).join('-');
        }
        return result;
      });
    return decodeURIComponent(encodedModule);
  }
}
