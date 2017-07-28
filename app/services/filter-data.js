import Service from '@ember/service';

export default Service.extend({
  showInherited: false,
  showProtected: false,
  showPrivate: false,
  showDeprecated: false,
  sideNav: {
    showPrivate: false
  }
});
