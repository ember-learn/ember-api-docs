import Mixin from '@ember/object/mixin';
import { computed, set, get } from '@ember/object';
import { A } from '@ember/array';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

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
          let enabled = filters.indexOf(filter) > -1;
          set(this, `filterData.show${capitalize(filter)}`, enabled);
        });
        return value;
      }
    }
  )
});
