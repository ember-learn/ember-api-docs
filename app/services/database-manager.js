import Ember from 'ember';
import Pouch from 'pouchdb';

const {
  String: {
    pluralize
  }
} = Ember;

export default Ember.Service.extend({
  init() {
    Ember.Service.prototype.init.apply(this, arguments);
    this.dbMap = Object.create(null);
  },

  db(modelName, host) {
    return this.dbMap[modelName] || this._instantiateDb(modelName, host);
  },

  _instantiateDb(modelName, host) {
    const pluralized = pluralize(modelName);
    return new Pouch(`http://${host}/${encodeURIComponent(pluralized)}`);
  }
});
