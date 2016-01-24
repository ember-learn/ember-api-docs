import Ember from 'ember';
import Pouch from 'pouchdb';
import ENV from 'ember-api-docs/config/environment';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    this._local = new Pouch('local_pouch');
    this._remote = new Pouch(ENV.COUCH_URL);
  },

  get(id) {
    const local = this._local;
    const remote = this._remote;

    return local.get(id).catch((err) => {
      if (err.status === 404) {
        return remote.get(id, {revs: true}).then((doc) => {
          return local.bulkDocs([doc], {new_edits: false});
        }).then(() => {
          return local.get(id);
        });
      }
    });
  },

  allDocs(ids, options={}) {
    const remote = this._remote;
    const local = this._local;

    const pouchOptions = Ember.$.extend({}, options, {include_docs: true, keys: ids});

    return local.allDocs(pouchOptions).then(documents => {
      const notFound = documents.rows.filter(doc => doc.error === 'not_found');

      if (notFound.length > 0) {
        const remotePouchOptions = Ember.$.extend({include_docs: true}, pouchOptions);
        return remote.allDocs(Ember.$.extend(remotePouchOptions, pouchOptions)).then((docs) => {
          const extractedDocs = extractDocuments(docs);
          return local.bulkDocs(extractedDocs.data, {new_edits: false});
        }).then(() => {
          return this.allDocs(ids, options);
        });
      }

      return {
        data: documents.rows.map(row => row.doc.data)
      }
    });
  }
});

function extractDocuments(docs) {
  const data = docs.rows.map(row=> row.doc);
  return {data};
}

