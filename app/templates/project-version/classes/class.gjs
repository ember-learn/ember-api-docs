{{! template-lint-disable no-action }}
<article class="chapter">
  {{#if (and @model.project.id @model.file @model.line (is-latest version=@model.projectVersion.version allVersions=this.allVersions))}}
    <a data-tooltip="Edit on Github" class="heading__link__edit" href="{{github-link @model.project.id @model.projectVersion.version @model.file @model.line isEdit=true}}" target="_blank" rel="noopener noreferrer">{{svg-jar "fa-pencil"}}</a>
  {{/if}}
  <h1 class="module-name">Class {{@model.name}}</h1>
  {{#if @model.access}}<span class="access">{{@model.access}}</span>{{/if}}

  <div class="attributes">
    {{#if @model.extends}}
      <div class="attribute">
        <span class="attribute-label">Extends:</span>
        <span class="attribute-value">
          <LinkTo
            @route="project-version.classes.class"
            @models={{array @model.extendedClassProjectName @model.projectVersion.compactVersion @model.extendedClassShortName}}
            data-test-extends-link
          >
            {{@model.extends}}
          </LinkTo>
        </span>
      </div>
    {{/if}}
    {{#if @model.uses}}
      <div class="attribute">
        <span class="attribute-label">Uses:</span>
        <span class="attribute-value">
          {{#each @model.usesObjects as |parentClass idx|}}
            {{#if (not-eq idx 0)}}<span class="comma">,</span>{{/if}}
            <LinkTo @route="project-version.classes.class" @models={{array parentClass.projectId @model.projectVersion.compactVersion parentClass.shortName}} data-test-uses-link>{{parentClass.name}}</LinkTo>
          {{/each}}
        </span>
      </div>
    {{/if}}
    {{#if @model.file}}
      <div class="attribute">
        <span class="attribute-label">Defined in:</span>
        <span class="attribute-value">
          <a href="{{github-link @model.project.id @model.projectVersion.version @model.file @model.line}}" target="_blank" rel="noopener noreferrer">{{@model.file}}:{{@model.line}}</a>
        </span>
      </div>
    {{/if}}
    {{#if @model.module}}
      <div class="attribute">
        <span class="attribute-label">Module:</span>
        <span class="attribute-value">
          <LinkTo
            @route="project-version.modules.module"
            @models={{array @model.projectVersion.compactVersion @model.module}}
          >
            {{@model.module}}
          </LinkTo>
        </span>
      </div>
    {{/if}}
    {{#if @model.since}}
      <div class="attribute">
        <span class="attribute-label">Since:</span>
        <span class="attribute-value">v{{@model.since}}</span>
      </div>
    {{/if}}
  </div>
  {{#if (and (not (eq this.static 1)) this.hasImportExample)}}
    <ImportExample @item={{@model.name}} @package={{this.module}} />
  {{/if}}
  <p class="description"><MarkdownToHtml @markdown={{@model.description}} /></p>

  {{#if (or @model.methods @model.properties @model.events)}}
    <div class="tabbed-layout">
      <nav class="tabbed-layout__menu">
        <LinkTo @route={{concat this.parentName ".index" }} @models={{array @model.project.id @model.projectVersion.compactVersion @model.name}} @query={{hash anchor=undefined}} class="tabbed-layout__menu__item" @activeClass="tabbed-layout__menu__item_selected" @current-when={{concat this.parentName ".index"}} data-test-tab="index">
          <span>Index</span>
        </LinkTo>
        {{#if @model.methods}}
          <LinkTo @route={{concat this.parentName ".methods" }} @models={{array @model.project.id @model.projectVersion.compactVersion @model.name}} @query={{hash anchor=undefined}} class="tabbed-layout__menu__item" @activeClass="tabbed-layout__menu__item_selected" @current-when={{concat this.parentName ".methods"}} data-test-tab="methods">
            <span>Methods</span>
          </LinkTo>
        {{/if}}
        {{#if @model.properties}}
          <LinkTo @route={{concat this.parentName ".properties" }} @models={{array @model.project.id @model.projectVersion.compactVersion @model.name}} @query={{hash anchor=undefined}} class="tabbed-layout__menu__item" @activeClass="tabbed-layout__menu__item_selected" @current-when={{concat this.parentName ".properties"}} data-test-tab="properties">
            <span>Properties</span>
          </LinkTo>
        {{/if}}
        {{#if @model.events}}
          <LinkTo @route={{concat this.parentName ".events" }} @models={{array @model.project.id @model.projectVersion.compactVersion @model.name}} @query={{hash anchor=undefined}} class="tabbed-layout__menu__item" @activeClass="tabbed-layout__menu__item_selected" @current-when={{concat this.parentName ".events"}} data-test-tab="events">
            <span>Events</span>
          </LinkTo>
        {{/if}}
      </nav>
      <section>
        Show:
        <label class="access-checkbox">
          <input id="inherited-toggle"
                 data-test-checkbox="inherited"
                 type="checkbox"
                 checked={{this.filterData.showInherited}}
                 onchange={{action "updateFilter" "showInherited"}}>
          Inherited
        </label>
        <label class="access-checkbox">
          <input id="protected-toggle"
                 data-test-checkbox="protected"
                 type="checkbox"
                 checked={{this.filterData.showProtected}}
                 onchange={{action "updateFilter" "showProtected"}}>
          Protected
        </label>
        <label class="access-checkbox">
          <input id="private-toggle"
                 data-test-checkbox="private"
                 type="checkbox"
                 checked={{this.filterData.showPrivate}}
                 onchange={{action "updateFilter" "showPrivate"}}>
          Private
        </label>
        <label class="access-checkbox">
          <input id="deprecated-toggle"
                 data-test-checkbox="deprecated"
                 type="checkbox"
                 checked={{this.filterData.showDeprecated}}
                 onchange={{action "updateFilter" "showDeprecated"}}>
          Deprecated
        </label>
      </section>
      <hr>
      {{outlet}}
    </div>
  {{/if}}

</article>
