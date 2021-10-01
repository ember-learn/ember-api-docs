import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ProjectService extends Service {
  @tracked version = '0.0.0';
  @tracked urlVersion;

  setVersion(version) {
    this.version = version;
  }

  setUrlVersion(version) {
    this.urlVersion = version;
  }

  getUrlVersion() {
    return this.urlVersion;
  }
}
