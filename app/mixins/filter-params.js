import Ember from 'ember';

const {
  Mixin, get, set, computed, A,
  String: { capitalize, w },
  inject: { service }
} = Ember;

export default Mixin.create({
  filterData: service(),

  queryParams: [{visibilityFilter: 'show'}],

  visibilityFilter: computed(
    'filterData.{showInherited,showProtected,showPrivate,showDeprecated}',
    {
      get() {
        return A([
          get(this, 'filterData.showInherited') ? 'inherited' : null,
          get(this, 'filterData.showProtected') ? 'protected' : null,
          get(this, 'filterData.showPrivate') ? 'private' : null,
          get(this, 'filterData.showDeprecated') ? 'deprecated' : null
        ]).compact().join(',');
      },
      set(key, value = '') {
        let filters = A(value.split(','));
        w('inherited protected private deprecated')
          .forEach(filter => {
            let enabled = filters.includes(filter);
            set(this, `filterData.show${capitalize(filter)}`, enabled);
          });
        return value;
      }
    }
  )
});
