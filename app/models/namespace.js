import { belongsTo } from '@ember-data/model';
import ClassModel from './class';

export default ClassModel.extend({
  projectVersion: belongsTo('project-version', {inverse: 'namespaces'})
});
