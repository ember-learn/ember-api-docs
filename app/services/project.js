import Service from '@ember/service';

export default Service.extend({
  version: '0.0.0',

  setVersion(version) {
    this.set('version', version);
  }
});
