import Ember from 'ember';

export function initialize() {

  if (typeof FastBoot !== 'undefined') {
    return
  }

  /**
   *  https://raw.githubusercontent.com/slindberg/jquery-scrollparent/master/LICENSE
   */
  Ember.$.fn.scrollParent = function() {
    let overflowRegex = /(auto|scroll)/;
    let position = this.css( "position" );
    let excludeStaticParent = position === "absolute";
    let scrollParent = this.parents().filter( function() {
      let parent = Ember.$( this );
      if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
        return false;
      }
      let overflowState = parent.css(["overflow", "overflowX", "overflowY"]);
      return (overflowRegex).test( overflowState.overflow + overflowState.overflowX + overflowState.overflowY );
    }).eq( 0 );

    return position === "fixed" || !scrollParent.length ? Ember.$( this[ 0 ].ownerDocument || document ) : scrollParent;
  };
}

export default {
  name: 'scroll-parent-shim',
  initialize
};
