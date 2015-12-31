import {Adapter} from 'ember-pouch';
import PouchDB from 'pouchdb';
import Ember from 'ember';

const db = new PouchDB('local_pouch');
const remote = new PouchDB('http://localhost:5984/documentation');

db.sync(remote, {
  live: true,
  remote: true
});

export default Adapter.extend({
  db: db,

  findRecord(store, type, id) {
    return this._super(store, type, id);
  },

  getRecordTypeName(type) {
    return Ember.String.dasherize(type.modelName);
  }
});

