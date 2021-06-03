/* eslint-disable ember/no-mixins, ember/no-classic-classes */
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';

export default Controller.extend(ParentNameMixin, {
  filterData: service(),
});
