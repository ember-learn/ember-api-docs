import Ember from 'ember';

const {
  Mixin, get, set, computed, A,
  String: { capitalize },
  inject: { service },
  isEmpty
} = Ember;

const filterTypes = ['inherited', 'protected', 'private', 'deprecated'];
const DEFAULT_FILTER = 'inherited';

export default Mixin.create({
  filterData: service(),

  queryParams: [{ visibilityFilter: 'show' }],

  visibilityFilter: computed(
    'filterData.{showInherited,showProtected,showPrivate,showDeprecated}',
    {
      get() {
        let appliedFilters = filterTypes.reduce((filters, filter) => {
          let filterValue = get(this, `filterData.show${capitalize(filter)}`) ? filter : null;
          filters.push(filterValue);
          return filters;
        }, A()).compact();

        if (isEmpty(appliedFilters)) {
          return DEFAULT_FILTER;
        } else {
          return appliedFilters.join(',');
        }
      },
      set(key, value = '') {
        let filters = A(value.split(','));
        filterTypes.forEach(filter => {
          let enabled = filters.includes(filter);
          set(this, `filterData.show${capitalize(filter)}`, enabled);
        });
        return value;
      }
    }
  )
});
