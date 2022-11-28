export function parentName(routeName) {
  return routeName.split('.').slice(0, 3).join('.');
}
