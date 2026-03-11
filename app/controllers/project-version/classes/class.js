// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed, set, get } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';
import { A } from '@ember/array';
import { capitalize } from '@ember/string';
import { isEmpty } from '@ember/utils';
import { parentName } from '../../../utils/parent-name';

const filterTypes = ['inherited', 'protected', 'private', 'deprecated'];
const DEFAULT_FILTER = 'inherited';

export default class ClassController extends Controller {
  /** @type {import('@ember/routing/router-service').default} */
  @service
  router;

  @service
  filterData;

  queryParams = [{ visibilityFilter: 'show' }];

  @service
  legacyModuleMappings;

  @service
  metaStore;

  @computed(
    'filterData.{showInherited,showProtected,showPrivate,showDeprecated}',
  )
  get visibilityFilter() {
    let appliedFilters = filterTypes
      .reduce((filters, filter) => {
        let filterValue = get(this, `filterData.show${capitalize(filter)}`)
          ? filter
          : null;
        filters.push(filterValue);
        return filters;
      }, A())
      .compact();

    if (isEmpty(appliedFilters)) {
      return DEFAULT_FILTER;
    } else {
      return appliedFilters.join(',');
    }
  }

  set visibilityFilter(value = '') {
    let filters = A(value.split(','));
    filterTypes.forEach((filter) => {
      let enabled = filters.indexOf(filter) > -1;
      set(this, `filterData.show${capitalize(filter)}`, enabled);
    });
  }

  @computed('legacyModuleMappings.mappings', 'model.{module,name}')
  get hasImportExample() {
    return this.legacyModuleMappings.hasClassMapping(
      this.model.name,
      this.model.module,
    );
  }

  @computed('legacyModulemappings.mappings', 'model.{module,name}')
  get module() {
    return this.legacyModuleMappings.getModule(
      this.model.name,
      this.model.module,
    );
  }

  @computed('metaStore.availableProjectVersions', 'model.project.id')
  get allVersions() {
    return this.metaStore.availableProjectVersions[this.model.project.id];
  }

  get parentName() {
    return parentName(this.router.currentRouteName);
  }

  @action
  updateFilter(filter) {
    this.filterData[filter] = !this.filterData[filter];
  }
}
