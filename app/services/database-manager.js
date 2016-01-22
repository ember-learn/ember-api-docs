import Ember from 'ember';
import Pouch from 'pouchdb';

const {
  RSVP,
  String: {
    pluralize
  }
} = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    this._local = new Pouch('local_pouch')
    //this._remote = new Pouch('https://fivetanley.cloudant.com/docs');
    this._remote = new Pouch('http://localhost:5984/docs');

    //this._remote.replicate.to(this._local, {
    //  filter: '_view',
    //  view: 'types/project-versions'
    //});
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

    let pouchOptions = Ember.$.extend({}, options, {keys: ids});

    return local.allDocs(pouchOptions).then(documents => {
      const notFound = documents.rows.filter(doc => doc.error === 'not_found');

      if (notFound.length > 0) {
        return remote.allDocs(pouchOptions).then((docs) => {
          return local.bulkDocs(docs, {new_edits: false});
        }).then(() => {
          return local.allDocs(pouchOptions).then(extractDocuments);
        });
      }

      return extractDocuments(documents);
    });
  }
});

function extractDocuments(docs) {
  return docs.rows;
}
