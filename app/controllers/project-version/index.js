import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';

export default Controller.extend({
  oldPackageImportSyntax: htmlSafe("<div class='highlight javascript'> <div class='ribbon'></div><div class='scroller'> <table class='CodeRay'> <tbody> <tr> <td class='line-numbers'> <pre>1\n2\n3\n4</pre></td><td class='code'><pre><span class='keyword'>import</span> Ember <span class='keyword'>from</span> <span class='string'>'ember'</span>;\n<span class='keyword'>export</span> <span class='keyword'>default</span> Ember.Component.extend({<span class='comment'>\n  // this is the old way</span>\n});</pre> </td></tr></tbody> </table> </div></div>"),

  newPackageImportSyntax: htmlSafe("<div class='highlight javascript'> <div class='ribbon'></div><div class='scroller'> <table class='CodeRay'> <tbody> <tr> <td class='line-numbers'><pre>1\n2\n3\n4</pre> </td><td class='code'><pre><span class='keyword'>import</span> Component <span class='keyword'>from</span> <span class='string'>'@ember/component'</span>;\n<span class='keyword'>export</span> <span class='keyword'>default</span> Component.extend({<span class='comment'>\n  // this is the current way</span>\n});</pre> </td></tr></tbody> </table> </div></div>")
});
