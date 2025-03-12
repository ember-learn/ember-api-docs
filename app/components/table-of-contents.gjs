<ol class='toc-level-0'>
  <li class='toc-level-0'>
    <a {{on 'click' (fn this.toggle 'modules')}} href='#' data-test-toc-title='packages'>Packages</a>
    <ol class='toc-level-1 modules selected'>
      {{#each @moduleIDs as |moduleID|}}

        {{#if (not-eq moduleID '@ember/object/computed')}}
          <li class='toc-level-1' data-test-module={{moduleID}}>
            <LinkTo @route='project-version.modules.module' @models={{array @version moduleID}}>{{moduleID}}</LinkTo>
          </li>
        {{/if}}

      {{/each}}
    </ol>
  </li>

  {{#if @isShowingNamespaces}}
    <li class='toc-level-0'>
      <a {{on 'click' (fn this.toggle 'namespaces')}} href='#' data-test-toc-title='namespaces'>Namespaces</a>
      <ol class='toc-level-1 namespaces selected'>
        {{#each @namespaceIDs as |namespaceID|}}
          <li class='toc-level-1' data-test-namespace={{namespaceID}}>
            <LinkTo @route='project-version.namespaces.namespace' @models={{array @version namespaceID}}>{{namespaceID}}</LinkTo>
          </li>
        {{/each}}
      </ol>
    </li>
  {{/if}}

  <li class='toc-level-0'>
    <a {{on 'click' (fn this.toggle 'classes')}} href='#' data-test-toc-title='classes'>Classes</a>
    <ol class='toc-level-1 classes selected'>
      {{#each @classesIDs as |classID|}}
        <li class='toc-level-1' data-test-class={{classID}}>
          <LinkTo @route='project-version.classes.class' @models={{array @version classID}}>{{classID}}</LinkTo>
        </li>
      {{/each}}
    </ol>
  </li>
</ol>
<label class='toc-private-toggle'>
  <input type='checkbox' checked={{@showPrivateClasses}} onchange={{@togglePrivateClasses}} class='private-deprecated-toggle' />
  Show Private / Deprecated
</label>