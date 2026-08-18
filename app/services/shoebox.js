import Service, { service } from '@ember/service';
import { assert } from '@ember/debug';

export default class ShoeboxService extends Service {
  @service prerender;

  shoebox = {};

  retrieve(key) {
    if (this.prerender.isPrerendering) {
      return this.shoebox?.[key];
    }

    let shoeboxItem = this.shoebox?.[key];
    if (shoeboxItem) {
      return shoeboxItem;
    }

    let el = document.querySelector(`#shoebox-${key}`);
    if (!el) {
      return;
    }
    let valueString = el.textContent;
    if (!valueString) {
      return;
    }

    shoeboxItem = JSON.parse(valueString);
    this.shoebox[key] = shoeboxItem;

    return shoeboxItem;
  }

  put(key, value) {
    assert(
      'shoebox.put is only invoked from the pre-rendered application',
      this.prerender.isPrerendering,
    );
    assert('the provided key is a string', typeof key === 'string');

    this.shoebox[key] = value;
  }

  store() {
    const shoebox = this.shoebox;
    const doc = window.document;

    // Clear any existing prerender/shoebox script tags
    const existingShoeboxes = doc.querySelectorAll(
      'script[type="prerender/shoebox"]',
    );
    existingShoeboxes.forEach((el) => el.remove());

    for (let key in shoebox) {
      if (!hasOwnProperty.call(shoebox, key)) {
        continue;
      }
      let value = shoebox[key];
      let textValue = JSON.stringify(value);
      textValue = escapeJSONString(textValue);

      let scriptEl = doc.createElement('script');

      scriptEl.setAttribute('type', 'prerender/shoebox');
      scriptEl.setAttribute('id', `shoebox-${key}`);
      scriptEl.textContent = textValue;
      doc.body.appendChild(scriptEl);
    }
  }
}

const JSON_ESCAPE = {
  '&': '\\u0026',
  '>': '\\u003e',
  '<': '\\u003c',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

const JSON_ESCAPE_REGEXP = /[\u2028\u2029&><]/g;

function escapeJSONString(string) {
  return string.replace(JSON_ESCAPE_REGEXP, function (match) {
    return JSON_ESCAPE[match];
  });
}
