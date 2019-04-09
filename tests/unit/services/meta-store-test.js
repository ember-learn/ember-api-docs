import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | meta-store', function(hooks) {
  setupTest(hooks);

  const availableProjectVersions = {
    "ember":[
      "2.14.1","2.13.4","1.0.0","1.1.2","1.10.1","1.11.4",
      "1.12.2","1.13.13","1.2.2","1.3.2","1.4.0","1.5.1",
      "1.6.1","1.7.1","1.8.1","1.9.1","2.0.3","2.1.2",
      "2.10.2","2.14.0"
    ],
    "ember-data":[]
  };

  const projectRevMap = {
    "ember-2.14.1":{
      "class":{
        "ember-2.14.1-Transition":"ember-2.14.1-Transition-e2c9dc8c5d",
        "ember-2.14.1-RSVP":"ember-2.14.1-RSVP-4a03b05e6b",
        "ember-2.14.1-RSVP.EventTarget":"ember-2.14.1-RSVP.EventTarget-10cdced26e",
        "ember-2.14.1-RSVP.Promise":"ember-2.14.1-RSVP.Promise-fbbcd10984",
        "ember-2.14.1-Registry":"ember-2.14.1-Registry-4c1d3349b8",
        "ember-2.14.1-Ember.ApplicationInstance":"ember-2.14.1-Ember.ApplicationInstance-6c74055348",
        "ember-2.14.1-Ember.ApplicationInstance.BootOptions":"ember-2.14.1-Ember.ApplicationInstance.BootOptions-d85accfd00",
        "ember-2.14.1-Ember.ContainerDebugAdapter":"ember-2.14.1-Ember.ContainerDebugAdapter-a638d957ef",
        "ember-2.14.1-Ember.DataAdapter":"ember-2.14.1-Ember.DataAdapter-13d97fba8e",
        "ember-2.14.1-Ember.Checkbox":"ember-2.14.1-Ember.Checkbox-ac010b20de",
        "ember-2.14.1-Ember.Templates.helpers":"ember-2.14.1-Ember.Templates.helpers-8ad35165c6",
        "ember-2.14.1-Ember.LinkComponent":"ember-2.14.1-Ember.LinkComponent-1f73e68442"
      },
      "namespace":{
        "ember-2.14.1-Ember":"ember-2.14.1-Ember-ada1cbc5c0",
        "ember-2.14.1-Ember.FEATURES":"ember-2.14.1-Ember.FEATURES-90a821dc67",
        "ember-2.14.1-Ember.String":"ember-2.14.1-Ember.String-c2c5c7e7df",
        "ember-2.14.1-Ember.computed":"ember-2.14.1-Ember.computed-e20827f87a",
        "ember-2.14.1-Ember.Instrumentation":"ember-2.14.1-Ember.Instrumentation-444cd5ed44",
        "ember-2.14.1-Ember.run":"ember-2.14.1-Ember.run-9984e22369",
        "ember-2.14.1-Ember.Location":"ember-2.14.1-Ember.Location-d9c1564180",
        "ember-2.14.1-Ember.AutoLocation":"ember-2.14.1-Ember.AutoLocation-4b8744f1e4"
      },
      "module":{
        "ember-2.14.1-ember":"ember-2.14.1-ember-d11dc7bcaf",
        "ember-2.14.1-ember-application":"ember-2.14.1-ember-application-f34af3b30d",
        "ember-2.14.1-ember-extension-support":"ember-2.14.1-ember-extension-support-46321b0650"
      },
      "missing":{
        "EmberObject":"EmberObject-9bb68cdfb6","Error":"Error-158974c414"
      }
    }
  };

  const fakeProjectRevMap = {
    "class": {
      "ember-42": "ember-42-hash"
    }
  };

  test('it should be properly initialized', function(assert) {
    let service = this.owner.lookup('service:meta-store');
    service.initializeStore(availableProjectVersions, projectRevMap);
    assert.ok(service.get('availableProjectVersions.ember.length'));
  });

  test('it should return correct fullVersion from compact', function(assert) {
    let service = this.owner.lookup('service:meta-store');
    service.initializeStore(availableProjectVersions, projectRevMap);
    assert.equal(service.getFullVersion('ember', '2.14'), '2.14.1');
    assert.equal(service.getFullVersion('ember', '2.1'), '2.1.2');
    assert.equal(service.getFullVersion('ember', '2.14.'), '2.14.1');
    assert.equal(service.getFullVersion('ember', '1.14'), undefined);
  });


  test('it should correct execute addToProjectRevMap', function(assert) {
    let service = this.owner.lookup('service:meta-store');
    service.initializeStore(availableProjectVersions, projectRevMap);
    service.addToProjectRevMap('ember-2.14.90.12', fakeProjectRevMap);
    assert.equal(service.getRevId('ember', '2.14.90.12', 'class', 'ember-42'), 'ember-42-hash');
  });

  test('it should return correct RevId', function(assert) {
    let service = this.owner.lookup('service:meta-store');
    service.initializeStore(availableProjectVersions, projectRevMap);
    assert.equal(typeof service.getRevId('ember', '2.14.1', 'namespace', 'ember-2.14.1-Ember.Instrumentation'), 'string');
  });

  test('correct version selected', function(assert) {
    let service = this.owner.lookup('service:meta-store');
    service.set('availableProjectVersions.ember', ['2.15.0', '2.14.1', '2.13.4', '1.0.0', '1.1.0', '1.1.2', '1.10.1', '1.11.4', '1.12.2', '1.13.13', '1.2.1','1.2.2', '1.2.0', '1.3.2', '1.4.0', '1.5.1', '1.6.1', '1.7.1', '1.8.1', '1.9.1', '2.0.3', '2.1.2', '2.10.2', '2.11.3', '2.12.2', '2.13.3', '2.2.2', '2.2.1', '2.2.0', '2.3.2', '2.4.6', '2.5.1', '2.6.2', '2.7.3', '2.8.3', '2.9.1', '2.14.0']);
    let matchA = service.getFullVersion('ember', '1.2')
    let matchB = service.getFullVersion('ember', '1.1')
    let matchC = service.getFullVersion('ember', '2.2')
    assert.equal(matchA, '1.2.2')
    assert.equal(matchB, '1.1.2')
    assert.equal(matchC, '2.2.2')
  });
});