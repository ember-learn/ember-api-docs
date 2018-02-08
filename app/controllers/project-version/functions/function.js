import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  fn: alias('model.fn'),
  fnModule: alias('model.fnModule')
});
