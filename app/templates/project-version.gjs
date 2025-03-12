{{! template-lint-disable no-inline-styles }}
<aside class="sidebar">
  <ol class="toc-level-0">
    <li class="toc-level-0" data-test-home>
      <LinkTo @route="project" @model="ember">Home</LinkTo>
    </li>
    <li class="toc-level-0">
      Projects
      <ol class="toc-level-1 selected" style="display: block;">
        <li class="toc-level-1"><LinkTo @route="project" @model="ember" @current-when={{eq this.activeProject "ember"}} class="spec-ember">Ember</LinkTo></li>
        <li class="toc-level-1"><LinkTo @route="project" @model="ember-data" @current-when={{eq this.activeProject "ember-data"}} class="spec-ember-data">Ember Data</LinkTo></li>
        <li class="toc-level-1"><LinkTo @route="project" @model="ember-cli" @current-when={{eq this.activeProject "ember-cli"}} class="spec-ember">Ember CLI</LinkTo></li>
      </ol>
    </li>
  </ol>

  <div class="select-container">
    <PowerSelect
      @onChange={{route-action "updateProject" this.activeProject}}
      @options={{this.projectVersions}}
      @selected={{this.selectedProjectVersion}}
      @ariaLabel="Select a version"
      @required={{true}}
      @searchField="compactVersion"
      @searchEnabled={{true}}
      as |ver|
    >
      {{ver.compactVersion}}
    </PowerSelect>
  </div>

  <TableOfContents
    @version={{this.urlVersion}}
    @classesIDs={{this.shownClassesIDs}}
    @moduleIDs={{this.shownModuleIDs}}
    @namespaceIDs={{this.shownNamespaceIDs}}
    @showPrivateClasses={{this.showPrivateClasses}}
    @togglePrivateClasses={{this.togglePrivateClasses}}
    @isShowingNamespaces={{version-lt this.selectedProjectVersion.compactVersion "2.16"}}
  />
</aside>
<section class="content">
  {{outlet}}
</section>
