import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeResponse(store, modelClass, payload, id, requestType) {
    const newPayload = {
      data: Object.keys(payload).reduce((memo, key) => {
        return memo.concat(payload[key].map(item => {
          const attributes = Ember.merge({rev: item.rev}, item.attributes);

          return {
            id: item.id,
            type: item.type,
            attributes: attributes,
            relationships: item.relationships
          };
        }));
      }, [])
    };

    if (requestType === 'findRecord' && Array.isArray(newPayload.data)) {
      newPayload.data = newPayload.data[0];
    }

    return this._super(store, modelClass, newPayload, id, requestType);
  }
});
