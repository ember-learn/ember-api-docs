import Ember from 'ember';
import DS from 'ember-data';

import Pouch from 'pouchdb';

function generatePouchID(type, id) {
  return `${type.modelName}-${id}`
}

function replicate(local, remote) {
}

export default DS.JSONAPIAdapter.extend({
  coalesceFindRequests: true,

  pouch: Ember.inject.service('database-manager'),

  findRecord(store, type, id, snapshot) {
    return this.get('pouch').get(generatePouchID(type, id));
  },

  findMany(store, type, ids) {
    const remappedIDs = ids.map(id => generatePouchID(type, id));

    return this.get('pouch').allDocs(remappedIDs);
  }

});

