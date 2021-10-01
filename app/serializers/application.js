import { inject as service } from '@ember/service';
import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class Application extends JSONAPISerializer {
  @service
  metaStore;

  normalizeFindRecordResponse(store, primaryModelClass, payload, id) {
    let normalizedDocument = super.normalizeFindRecordResponse(...arguments);

    // We do this because ember data doesn't handle meta data in accordance to json-api spec yet
    if (primaryModelClass.modelName === 'project') {
      this.metaStore.availableProjectVersions[id] =
        normalizedDocument.meta.availableVersions;
    } else if (primaryModelClass.modelName === 'project-version') {
      this.metaStore.addToProjectRevMap(id, normalizedDocument.meta);
    }

    return normalizedDocument;
  }
}
