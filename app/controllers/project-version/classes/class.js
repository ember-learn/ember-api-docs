import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';

export default Controller.extend(ParentNameMixin, {
  filterData: service(),
  legacyModuleMappings: service(),

  hasImportExample: computed('model.name', 'legacyModuleMappings.mappings', function () {
    return this.get('legacyModuleMappings').hasClassMapping(this.get('model.name'), this.get('model.module'));
  }),

  actions: {
    updateFilter(filter) {
      this.toggleProperty(`filterData.${filter}`);
    }
  }
});
