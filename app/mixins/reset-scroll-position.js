import Ember from 'ember';

const {$, isPresent} = Ember;

export default Ember.Mixin.create({
  actions: {

    willTransition(transition){
      const currentRouteParts = this.get('routeName').split('.');
      const targetRouteParts = transition.targetName.split('.');

      if(currentRouteParts[0] !== targetRouteParts[0] || currentRouteParts[1] !== targetRouteParts[1]){
        $('main > article').scrollTop(0);
      }
    }
  }
});
