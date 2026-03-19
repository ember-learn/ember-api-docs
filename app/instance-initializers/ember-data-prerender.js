import { dasherize } from '@ember/string';

export function initialize(applicationInstance) {
  window.__emberApiDocs = window.__emberApiDocs ?? applicationInstance;

  let store = applicationInstance.lookup('service:store');
  let shoebox = applicationInstance.lookup('service:shoebox');
  const isPrerendering =
    applicationInstance.lookup('service:prerender').isPrerendering;

  if (!isPrerendering) {
    if (!shoebox) {
      return;
    }
    let dump = shoebox.retrieve('ember-data-store');
    if (!dump) {
      return;
    }
    store.pushPayload(dump.records);
    return;
  }

  shoebox?.put('ember-data-store', {
    get records() {
      const modelNames = Object.keys(store._modelFactoryCache);
      return modelNames
        .map((name) => {
          return store.peekAll(name).toArray();
        })
        .reduce((a, b) => a.concat(b), [])
        .filter((record) => record.get('isLoaded') && !record.get('isNew'))
        .map((record) => {
          const serializedRecord = record.serialize({ includeId: true });

          record.eachRelationship((name, meta) => {
            const link = record[meta.kind](name).link();

            if (link) {
              const dashName = dasherize(name);

              serializedRecord.data.relationships =
                serializedRecord.data.relationships || {};
              serializedRecord.data.relationships[dashName] =
                serializedRecord.data.relationships[dashName] || {};
              serializedRecord.data.relationships[dashName].links = {
                related: link,
              };
            }
          });

          return serializedRecord;
        })
        .reduce(
          (a, b) => {
            a.data.push(b.data);
            return a;
          },
          { data: [] },
        );
    },
  });
}

export default {
  name: 'ember-data-prerender',
  initialize,
};
