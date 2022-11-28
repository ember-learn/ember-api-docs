import ApiIndex from './components/api-index';
import ApiIndexFilter from './components/api-index-filter';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ApiIndex: typeof ApiIndex;
    ApiIndexFilter: typeof ApiIndexFilter;
  }
}
