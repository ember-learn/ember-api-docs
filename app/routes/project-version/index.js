/* eslint-disable ember/no-classic-classes */
import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const projectVersion = this.modelFor('project-version');
    const project = await projectVersion.project;
    return project;
  },
});
