import { test } from "qunit";
import { visit, find } from "ember-native-dom-helpers";
import moduleForAcceptance from "ember-api-docs/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | 404 wildcard");

function getRandomUriPart() {
  return Math.random()
    .toString(36)
    .slice(2);
}

function titleContent() {
  return find(".whoops__title").textContent.trim();
}

function getRandomPath(segmentsCount) {
  let generatedPath = new Array(segmentsCount)
    .fill(null)
    .map(() => getRandomUriPart())
    .join("/");

  let queryString = ["foo", "bar", "baz"]
    .reduce((result, paramName) => {
      return result + (result ? "&" : "?") + `${paramName}=${paramName}-value`;
    }, "");

  return "/" + generatedPath + queryString;
}

const titleText = `Ack! 404 friend, you're in the wrong place`;


test("Single segment url should return Application page", async function(assert) {
  await visit(getRandomPath(1));
  assert.equal(find('.module-name').textContent.trim(), 'Package @ember/application');
});

test("Random non-handled route should return 404 page, 2 lvl", async function(assert) {
  await visit(getRandomPath(2));
  assert.equal(titleContent(), titleText);
});

test("Random non-handled route should return 404 page, 3 lvl", async function(assert) {
  await visit(getRandomPath(3));
  assert.equal(titleContent(), titleText);
});

test("Random non-handled route should return 404 page, 4 lvl", async function(assert) {
  await visit(getRandomPath(4));
  assert.equal(titleContent(), titleText);
});

test("Random non-handled route should return 404 page, 5 lvl", async function(assert) {
  await visit(getRandomPath(5));
  assert.equal(titleContent(), titleText);
});
