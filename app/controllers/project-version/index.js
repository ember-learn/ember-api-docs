import Controller from '@ember/controller';
import Ember from 'ember';
const { computed } = Ember;

export default Controller.extend({
  oldPackageImportSyntax: computed(function() {
    return Ember.String.htmlSafe("<div class='highlight javascript'> <div class='ribbon'></div><div class='scroller'> <table class='CodeRay'> <tbody> <tr> <td class='line-numbers'> <pre>1\n2\n3\n4</pre></td><td class='code'><pre><span class='keyword'>import</span> Ember <span class='keyword'>from</span> <span class='string'>'ember'</span>;\n<span class='keyword'>export</span> <span class='keyword'>default</span> Component.extend({<span class='comment'>\n  // this is the old way</span>\n});</pre> </td></tr></tbody> </table> </div></div>")
  }),

  newPackageImportSyntax: computed(function() {
    return Ember.String.htmlSafe("<div class='highlight javascript'> <div class='ribbon'></div><div class='scroller'> <table class='CodeRay'> <tbody> <tr> <td class='line-numbers'><pre>1\n2\n3\n4</pre> </td><td class='code'><pre><span class='keyword'>import</span> Component <span class='keyword'>from</span> <span class='string'>'@ember/component'</span>;\n<span class='keyword'>export</span> <span class='keyword'>default</span> Component.extend({<span class='comment'>\n  // this is the current way</span>\n});</pre> </td></tr></tbody> </table> </div></div>")
  })
});
