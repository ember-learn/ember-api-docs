import createExcerpt from 'ember-api-docs/utils/create-excerpt';
import { module, test } from 'qunit';

module('Unit | Utility | create excerpt', function() {
  const testString = "<html><head></head><body><p><code>HashLocation</code> implements the location API using the browser&apos;s\nhash. At present, it relies on a <code>hashchange</code> event existing in the\nbrowser.</p>\n<p>Using <code>HashLocation</code> results in URLs with a <code>#</code> (hash sign) separating the\nserver side URL portion of the URL from the portion that is used by Ember.</p>\n<p>Example:</p>\n<div class=\"highlight app/router.js\">\n      <div class=\"ribbon\"></div>\n      <table class=\"CodeRay\">\n          <thead>\n            <tr>\n              <td colspan=\"2\">app/router.js</td>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"line-numbers\"><pre>1\n2\n3\n4\n5\n6\n7\n8\n9\n</pre></td>\n              <td class=\"code\"><pre>Router.map(<span class=\"function\"><span class=\"keyword\">function</span><span class=\"params\">()</span> </span>{\n  <span class=\"keyword\">this</span>.route(<span class=\"string\">&apos;posts&apos;</span>, <span class=\"function\"><span class=\"keyword\">function</span><span class=\"params\">()</span> </span>{\n    <span class=\"keyword\">this</span>.route(<span class=\"string\">&apos;new&apos;</span>);\n  });\n});\n\nRouter.reopen({\n  location: <span class=\"string\">&apos;hash&apos;</span>\n});</pre></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    \n<p>This will result in a posts.new url of <code>/#/posts/new</code>.</p>\n</body></html>";

  test('it works', function(assert) {
    let result = createExcerpt(testString);
    assert.ok(result.includes('/\n') === false, 'does not include tabs');
    assert.ok(result.includes('<table') === false, 'does not include table code example');
    assert.ok(result.includes('/\t') === false, 'does not include line breaks');
    assert.ok(result.length <= 300, 'length is maximum 300 characters');
  });

  test('max length can be changed', function(assert) {
    let result = createExcerpt(testString, 10);
    assert.ok(result.length <= 10);
  });
});