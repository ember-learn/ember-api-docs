import Ember from 'ember';
import Pouch from 'pouchdb';
import ENV from 'ember-api-docs/config/environment';
import extend from 'lodash/object/extend';

const Promise = Ember.RSVP.Promise;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    if (ENV.testing) {
      this._local = new Pouch((new Date()).toString(), {adapter: 'memory'});
    } else if (typeof FastBoot !== 'undefined') {
      const redisDown = FastBoot.require('redisdown');
      this._local = new Pouch('docsdb', {db: redisDown, url: ENV.redisURL});
    } else {
      this._local = new Pouch('local_pouch');
    }
    this._remote = new Pouch(ENV.COUCH_URL, {skip_setup: true});
  },

  get(id) {
    const local = this._local;
    const remote = this._remote;

    return new Promise((resolve, reject) => {
      return local.get(id).catch((err) => {
        if (err.status === 404) {
          return remote.get(id, {revs: true}).then((doc) => {
            return local.bulkDocs([doc], {new_edits: false});
          }).then(() => {
            return local.get(id);
          });
        }
      }).then(resolve, reject);
    });
  },

  allDocs(ids, options={}) {
    const remote = this._remote;
    const local = this._local;

    const pouchOptions = extend({}, options, {include_docs: true, keys: ids});

    return new Promise((resolve, reject) => {
      return local.allDocs(pouchOptions).then(documents => {
        const notFound = documents.rows.filter(doc => doc.error === 'not_found');

        if (notFound.length > 0) {
          const remotePouchOptions = extend({include_docs: true}, pouchOptions);
          return remote.allDocs(extend(remotePouchOptions, pouchOptions)).then((docs) => {
            const extractedDocs = extractDocuments(docs);
            return local.bulkDocs(extractedDocs.data, {new_edits: false});
          }).then(() => {
            return this.allDocs(ids, options);
          });
        }

        return {
          data: documents.rows.map(row => row.doc.data)
        };
      }).then(resolve, reject);
    });
  },

  willDestroy() {
    this._local = this._remote = null;
    this._super(...arguments);
  }
});

function extractDocuments(docs) {
  const data = docs.rows.map(row=> row.doc);
  return {data};
}

