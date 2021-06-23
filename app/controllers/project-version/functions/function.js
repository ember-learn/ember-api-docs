import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default class FunctionController extends Controller {
  @alias('model.fn')
  fn;

  @alias('model.fnModule')
  fnModule;
}
