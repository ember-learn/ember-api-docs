import { inject as service } from '@ember/service';
import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class Application extends JSONAPISerializer {
  @service
  metaStore;

  extractId(_, hash) {
    return hash.id.toLowerCase();
  }

  extractRelationship(relationship) {
    // for some reason we only need to update the id to lowercase when it's an object relationship and not an array 🤷
    if (relationship?.data?.id) {
      relationship.data.id = relationship.data.id.toLowerCase();
    }
    return super.extractRelationship(relationship);
  }

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
