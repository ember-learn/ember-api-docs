import { helper } from '@ember/component/helper';

export function removeEmberPrefix(params/*, hash*/) {
  let ext = params[0]; 
  // Ember doesn't use the Ember prefix on all Classes
  if(ext.indexOf('.')>=0 && ext.substring(0,5) === 'Ember'){
    // return ext.replace('.','');
    return ext.slice(6);
  }
  else{
    return ext;
  }
}

export default helper(removeEmberPrefix);
