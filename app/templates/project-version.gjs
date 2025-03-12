import RouteTemplate from 'ember-route-template'
import { LinkTo } from "@ember/routing";
import eq from "ember-api-docs/helpers/eq";
import PowerSelect from "ember-power-select/components/power-select";
import routeAction from "ember-route-action-helper/helpers/route-action";
import TableOfContents from "ember-api-docs/components/table-of-contents";
import versionLt from "ember-api-docs/helpers/version-lt";
export default RouteTemplate(<template>{{!-- template-lint-disable no-inline-styles no-route-action --}}
<aside class="sidebar">
  <ol class="toc-level-0">
    <li class="toc-level-0" data-test-home>
      <LinkTo @route="project" @model="ember">Home</LinkTo>
    </li>
    <li class="toc-level-0">
      Projects
      <ol class="toc-level-1 selected" style="display: block;">
        <li class="toc-level-1"><LinkTo @route="project" @model="ember" @current-when={{eq @controller.activeProject "ember"}} class="spec-ember">Ember</LinkTo></li>
        <li class="toc-level-1"><LinkTo @route="project" @model="ember-data" @current-when={{eq @controller.activeProject "ember-data"}} class="spec-ember-data">Ember Data</LinkTo></li>
        <li class="toc-level-1"><LinkTo @route="project" @model="ember-cli" @current-when={{eq @controller.activeProject "ember-cli"}} class="spec-ember">Ember CLI</LinkTo></li>
      </ol>
    </li>
  </ol>

  <div class="select-container">
    <PowerSelect @onChange={{routeAction "updateProject" @controller.activeProject}} @options={{@controller.projectVersions}} @selected={{@controller.selectedProjectVersion}} @ariaLabel="Select a version" @required={{true}} @searchField="compactVersion" @searchEnabled={{true}} as |ver|>
      {{ver.compactVersion}}
    </PowerSelect>
  </div>

  <TableOfContents @version={{@controller.urlVersion}} @classesIDs={{@controller.shownClassesIDs}} @moduleIDs={{@controller.shownModuleIDs}} @namespaceIDs={{@controller.shownNamespaceIDs}} @showPrivateClasses={{@controller.showPrivateClasses}} @togglePrivateClasses={{@controller.togglePrivateClasses}} @isShowingNamespaces={{versionLt @controller.selectedProjectVersion.compactVersion "2.16"}} />
</aside>
<section class="content">
  {{outlet}}
</section>
</template>)