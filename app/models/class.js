import DS from 'ember-data';

const {attr, belongsTo} = DS;

export default DS.Model.extend({
  name: attr(),
  methods: attr(),
  parentClass: belongsTo('class', {async: true, inverse: null}),
});
