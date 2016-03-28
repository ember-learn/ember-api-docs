import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

if (!config.EMBER_CLI_FASTBOOT && !Ember.testing) {
  try {
    window.Typekit.load({async: true});
  } catch (e) {
    console.log('err', e);
  }
}

export default App;
