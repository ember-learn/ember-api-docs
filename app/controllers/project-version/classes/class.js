import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';
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

  get visibilityFilter() {
    let appliedFilters = filterTypes
      .reduce((filters, filter) => {
        let filterValue = this.filterData[`show${capitalize(filter)}`]
          ? filter
          : null;
        filters.push(filterValue);
        return filters;
      }, [])
      .filter(Boolean);

    if (isEmpty(appliedFilters)) {
      return DEFAULT_FILTER;
    } else {
      return appliedFilters.join(',');
    }
  }

  set visibilityFilter(value = '') {
    let filters = value.split(',');
    filterTypes.forEach((filter) => {
      this.filterData[`show${capitalize(filter)}`] =
        filters.indexOf(filter) > -1;
    });
  }

  get hasImportExample() {
    return this.legacyModuleMappings.hasClassMapping(
      this.model.name,
      this.model.module,
    );
  }

  get module() {
    return this.legacyModuleMappings.getModule(
      this.model.name,
      this.model.module,
    );
  }

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
