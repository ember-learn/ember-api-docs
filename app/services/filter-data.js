import Service from "@ember/service";

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set("sideNav",{
      showPrivate: false
    });
  },
  showInherited: false,
  showProtected: false,
  showPrivate: false,
  showDeprecated: false,
  sideNav: null
});
