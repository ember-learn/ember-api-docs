import ClassModel from './class';
import { belongsTo } from '@ember-data/model';

export default ClassModel.extend({
  projectVersion: belongsTo('project-version', { inverse: 'namespaces' })
});
