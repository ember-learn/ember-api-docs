export default function getOffset(element, container) {
  let offsetTop = element.offsetTop;
  let parent = element.offsetParent;
  while (parent != null && parent != container) {
    offsetTop  += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return offsetTop;
}
