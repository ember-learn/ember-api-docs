import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeadDataService extends Service {
  @tracked title;
  @tracked isRelease;
  @tracked compactVersion;
  @tracked urlVersion;
  @tracked canonicalUrl;
  @tracked description;
  @tracked cdnDomain;
  @tracked modelName;
  @tracked modelVersion;
}
