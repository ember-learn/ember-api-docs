// This removes any pre-rendered elements, so that the booting
// application will replace the pre-rendered output
export function clearHtml() {
  let current = document.getElementById('prerender-body-start');
  let endMarker = document.getElementById('prerender-body-end');

  if (current && endMarker) {
    let shoeboxNodes = document.querySelectorAll('[type="prerender/shoebox"]');
    let shoeboxNodesArray = []; // Note that IE11 doesn't support more concise options like Array.from, so we have to do something like this
    for (let i = 0; i < shoeboxNodes.length; i++) {
      shoeboxNodesArray.push(shoeboxNodes[i]);
    }
    let parent = current.parentElement;
    let nextNode;
    do {
      nextNode = current.nextSibling;
      parent.removeChild(current);
      current = nextNode;
    } while (
      nextNode &&
      nextNode !== endMarker &&
      shoeboxNodesArray.indexOf(nextNode) < 0
    );
    endMarker.parentElement.removeChild(endMarker);
  }
}
export default {
  name: 'clear-double-boot',

  initialize(instance) {
    const prerender = instance.lookup('service:prerender');
    if (!prerender.isPrerendering) {
      const originalDidCreateRootView = instance.didCreateRootView;

      instance.didCreateRootView = function () {
        clearHtml();
        originalDidCreateRootView.apply(instance, arguments);
      };
    }
  },
};
