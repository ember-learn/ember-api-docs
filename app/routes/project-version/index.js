import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const projectVersion = this.modelFor('project-version');

    return {
      project: projectVersion.belongsTo('project').id(),
      version: projectVersion.version,
    };
  }
}
