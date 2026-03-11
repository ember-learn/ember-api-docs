import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FilterDataService extends Service {
  @tracked showInherited = false;
  @tracked showProtected = false;
  @tracked showPrivate = false;
  @tracked showDeprecated = false;

  sideNav = {
    showPrivate: false,
  };
}
