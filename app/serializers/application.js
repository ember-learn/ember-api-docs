import JSONAPISerializer from '@ember-data/serializer/json-api';
import { inject as service } from '@ember/service';

export default JSONAPISerializer.extend({

  metaStore: service(),

  normalizeFindRecordResponse(store, primaryModelClass, payload, id) {
    let normalizedDocument = this._super(...arguments);

    // We do this because ember data doesn't handle meta data in accordance to json-api spec yet
    if (primaryModelClass.modelName === 'project') {
      this.get('metaStore.availableProjectVersions')[id] = normalizedDocument.meta.availableVersions;
    } else if (primaryModelClass.modelName === 'project-version') {
      this.metaStore.addToProjectRevMap(id, normalizedDocument.meta)
    }

    return normalizedDocument;
  }
});

