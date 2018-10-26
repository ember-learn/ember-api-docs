import Service from '@ember/service';

export default Service.extend({
  showInherited: false,
  showProtected: false,
  showPrivate: false,
  showDeprecated: false,
  sideNav: null,

  init() {
    this.sideNav = {
      showPrivate: false
    }
    this._super(...arguments);
  }
});
