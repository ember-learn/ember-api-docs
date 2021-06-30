import Model, { attr } from '@ember-data/model';

export default class Missing extends Model {
  @attr()
  name;
}
