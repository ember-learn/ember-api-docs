import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const projectVersion = this.modelFor('project-version');
    const project = await projectVersion.project;
    return project;
  }
}
