import Service from '@ember/service';

export default Service.extend({
  showInherited: true,
  showProtected: false,
  showPrivate: false,
  showDeprecated: false,
  sideNav: {
    showPrivate: false
  }
});
