import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ParentNameMixin from 'ember-api-docs/mixins/parent-name';
import FilterParams from 'ember-api-docs/mixins/filter-params';

export default class ClassController extends Controller.extend(
  ParentNameMixin,
  FilterParams
) {
  @service
  filterData;

  @service
  legacyModuleMappings;

  @service
  metaStore;

  @computed('legacyModuleMappings.mappings', 'model.{module,name}')
  get hasImportExample() {
    return this.legacyModuleMappings.hasClassMapping(
      this.get('model.name'),
      this.get('model.module')
    );
  }

  @computed('legacyModulemappings.mappings', 'model.{module,name}')
  get module() {
    return this.legacyModuleMappings.getModule(
      this.get('model.name'),
      this.get('model.module')
    );
  }

  @computed('metaStore.availableProjectVersions', 'model.project.id')
  get allVersions() {
    return this.get('metaStore.availableProjectVersions')[
      this.get('model.project.id')
    ];
  }

  @action
  updateFilter(filter) {
    this.toggleProperty(`filterData.${filter}`);
  }
}
