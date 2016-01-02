import Ember from 'ember';
import Pouch from 'pouchdb';

const {
  String: {
    pluralize
  }
} = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    this._local = new Pouch('local_pouch')
    this._remote = new Pouch('http://localhost:5984/documentation');

    this._remote.put({
      _id: '_design/types',
      views: {
        'project-versions': {
          map: function (doc) {
            if (doc.data.type === 'project-version') {
              emit(doc._id);
            }
          }.toString()
        }
      }
    }).catch(() => true).then(() => {
      this._remote.replicate.to(this._local, {
        filter: '_view',
        view: 'types/project-versions'
      });
    });
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
  }
});
