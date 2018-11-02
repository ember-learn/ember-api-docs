import { helper } from '@ember/component/helper';

export function projectNameFromClassName([className, fallback]) {
    className = className || "";
    if (className.indexOf('Ember') > -1) {
      return 'ember';
    }

    if (className.indexOf('DS.') > -1) {
      return 'ember-data';
    }

    return fallback;
}

export default helper(projectNameFromClassName);
