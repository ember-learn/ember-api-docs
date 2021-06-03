/* eslint-disable ember/no-classic-classes */
import Model, { attr } from '@ember-data/model';

export default Model.extend({
  name: attr(),
});
