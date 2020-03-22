import Model, { attr } from '@ember-data/model';

export default class MissingModel extends Model {
  @attr() name;
}
