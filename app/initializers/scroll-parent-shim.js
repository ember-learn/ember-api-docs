import $ from 'jquery';

export function initialize() {

  if (typeof FastBoot !== 'undefined') {
    return
  }

  /**
   *  https://raw.githubusercontent.com/slindberg/jquery-scrollparent/master/LICENSE
   */
  $.fn.scrollParent = function() {
    let overflowRegex = /(auto|scroll)/;
    let position = this.css( "position" );
    let excludeStaticParent = position === "absolute";
    let scrollParent = this.parents().filter( function() {
      let parent = $( this );
      if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
        return false;
      }
      let overflowState = parent.css(["overflow", "overflowX", "overflowY"]);
      return (overflowRegex).test( overflowState.overflow + overflowState.overflowX + overflowState.overflowY );
    }).eq( 0 );

    return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
  };
}

export default {
  name: 'scroll-parent-shim',
  initialize
};
