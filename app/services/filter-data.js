import Service from '@ember/service';

export default class FilterDataService extends Service {
  // These attributes are not @tracked because they are used in computed
  // properties and not directly in templates.
  showInherited = false;
  showProtected = false;
  showPrivate = false;
  showDeprecated = false;

  sideNav = {
    showPrivate: false,
  };
}
