import Service from '@ember/service';

export default class FilterDataService extends Service {
  showInherited = false;
  showProtected = false;
  showPrivate = false;
  showDeprecated = false;
  sideNav = null;

  init() {
    this.sideNav = {
      showPrivate: false,
    };
    super.init(...arguments);
  }
}
