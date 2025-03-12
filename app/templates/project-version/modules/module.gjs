<article class="chapter">
  {{#if (eq this.model.name 'ember-data-overview')}}
    <h1 class="module-name">EmberData Overview</h1>
  {{else}}
    <h1 class="module-name">Package {{this.model.name}}</h1>
  {{/if}}
  {{#if this.model.access}}<span class="access">{{this.model.access}}</span>{{/if}}

  <p class="attributes">
    {{#if this.model.parent}}
      <div class="attribute">
        <span class="attribute-label">Parent:</span>
        <span class="attribute-value"><LinkTo @route="project-version.modules.module" @models={{array this.model.projectVersion.compactVersion this.model.parent}}>{{this.model.parent}}</LinkTo></span>
      </div>
    {{/if}}
  </p>

  <p class="description"><MarkdownToHtml @markdown={{this.model.description}} /></p>

  {{#if this.submodules}}
    <section>
      <h2 id="submodules" class="anchorable-toc">
        <a href="#submodules" class="toc-anchor"></a>
        Submodules
      </h2>
      <ul class="spec-method-list">
        {{#each this.submodules as |module|}}
          <li>
            <LinkTo @route="project-version.modules.module" @model={{module}}>
              {{module}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    </section>
  {{/if}}

  {{#if this.classesAndNamespaces}}
    <section>
      <h2 id="classes" class="anchorable-toc">
        <a href="#classes" class="toc-anchor"></a>
        Classes
      </h2>
      <ul class="spec-property-list">
        {{#each this.classesAndNamespaces as |klass|}}
          {{#if (not (and (eq this.model.name "ember-data") (eq klass "Ember")))}}
            <li>
              <LinkTo @route="project-version.classes.class" @model={{klass}}>
                {{klass}}
              </LinkTo>
            </li>
          {{/if}}
        {{/each}}
      </ul>
    </section>
  {{/if}}

  {{#if (and this.functionHeadings (gt this.functionHeadings.length 0)) }}

    <h2 id="functions" class="anchorable-toc">
      <a href="#functions" class="toc-anchor"></a>
      Functions
    </h2>
    {{#each this.functionHeadings as |funcHeading|}}
      <h4 id="{{function-heading-id funcHeading}}" class="anchorable-toc">
        <a href="#{{function-heading-id funcHeading}}" class="toc-anchor"></a>
        {{funcHeading}}
      </h4>
      <ul class="spec-method-list">
        {{#each (better-get this.functions funcHeading) as |method|}}
          <li>
            <LinkTo @route="project-version.functions.function" @models={{array this.model.project.id this.model.projectVersion.compactVersion funcHeading method.name}}>
              {{method.name}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    {{/each}}

  {{/if}}
  {{outlet}}

</article>
