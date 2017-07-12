import Ember from 'ember';


export default Ember.Mixin.create({
  filterData: Ember.inject.service(),

  queryParams: [{visibilityFilter: 'show'}],

  visibilityFilter: Ember.computed(
    'filterData.{showInherited,showProtected,showPrivate,showDeprecated}',
    {
      get() {
        return Ember.A([
          Ember.get(this, 'filterData.showInherited') ? 'inherited' : null,
          Ember.get(this, 'filterData.showProtected') ? 'protected' : null,
          Ember.get(this, 'filterData.showPrivate') ? 'private' : null,
          Ember.get(this, 'filterData.showDeprecated') ? 'deprecated' : null
        ]).compact().join(',');
      },
      set(key, value = '') {
        let filters = Ember.A(value.split(','));
        Ember.String.w('inherited protected private deprecated')
          .forEach(filter => {
            let enabled = filters.includes(filter);
            Ember.set(this, `filterData.show${Ember.String.capitalize(filter)}`, enabled);
          });
        return value;
      }
    }
  )
});
