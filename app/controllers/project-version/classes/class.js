import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import { A } from '@ember/array';
import { capitalize } from '@ember/string';
import { isEmpty } from '@ember/utils';

const filterTypes = ['inherited', 'protected', 'private', 'deprecated'];
const DEFAULT_FILTER = 'inherited';

export default Controller.extend({
  filterData: service(),

  router: service(),

  parentName: computed('router.currentRouteName', function() {
    const routeName = this.router.currentRouteName;
    const routes = routeName.split('.');
    return routes.slice(0, 3).join('.');
  }),

  legacyModuleMappings: service(),

  hasImportExample: computed('model.name', 'legacyModuleMappings.mappings', function() {
    return this.legacyModuleMappings.hasClassMapping(
      this.get('model.name'),
      this.get('model.module')
    );
  }),

  module: computed('model.name', 'legacyModulemappings.mappings', function() {
    return this.legacyModuleMappings.getModule(this.get('model.name'), this.get('model.module'));
  }),

  queryParams: [{ visibilityFilter: 'show' }],

  visibilityFilter: computed(
    'filterData.{showInherited,showProtected,showPrivate,showDeprecated}',
    {
      get() {
        let appliedFilters = filterTypes
          .reduce((filters, filter) => {
            let filterValue = get(this, `filterData.show${capitalize(filter)}`) ? filter : null;
            filters.push(filterValue);
            return filters;
          }, A())
          .compact();

        if (isEmpty(appliedFilters)) {
          return DEFAULT_FILTER;
        } else {
          return appliedFilters.join(',');
        }
      },
      set(key, value = '') {
        let filters = A(value.split(','));
        filterTypes.forEach(filter => {
          let enabled = filters.indexOf(filter) > -1;
          set(this, `filterData.show${capitalize(filter)}`, enabled);
        });
        return value;
      }
    }
  ),

  actions: {
    updateFilter(filter) {
      this.toggleProperty(`filterData.${filter}`);
    }
  }
});
