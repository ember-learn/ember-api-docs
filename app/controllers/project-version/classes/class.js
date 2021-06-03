/* eslint-disable ember/no-mixins, ember/no-classic-classes, ember/no-get, ember/no-actions-hash */
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';
import FilterParams from 'ember-api-docs/mixins/filter-params';

export default Controller.extend(ParentNameMixin, FilterParams, {
  filterData: service(),
  legacyModuleMappings: service(),
  metaStore: service(),

  hasImportExample: computed(
    'legacyModuleMappings.mappings',
    'model.{module,name}',
    function () {
      return this.legacyModuleMappings.hasClassMapping(
        this.get('model.name'),
        this.get('model.module')
      );
    }
  ),

  module: computed(
    'legacyModulemappings.mappings',
    'model.{module,name}',
    function () {
      return this.legacyModuleMappings.getModule(
        this.get('model.name'),
        this.get('model.module')
      );
    }
  ),

  allVersions: computed(
    'metaStore.availableProjectVersions',
    'model.project.id',
    function () {
      return this.get('metaStore.availableProjectVersions')[
        this.get('model.project.id')
      ];
    }
  ),

  actions: {
    updateFilter(filter) {
      this.toggleProperty(`filterData.${filter}`);
    },
  },
});
