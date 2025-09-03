import RouteTemplate from 'ember-route-template'
import eq from "ember-api-docs/helpers/eq";
import { LinkTo } from "@ember/routing";
import { array } from "@ember/helper";
import MarkdownToHtml from "ember-cli-showdown/components/markdown-to-html";
import not from "ember-truth-helpers/helpers/not";
import and from "ember-truth-helpers/helpers/and";
import gt from "ember-truth-helpers/helpers/gt";
import functionHeadingId from "ember-api-docs/helpers/function-heading-id";
import betterGet from "ember-api-docs/helpers/better-get";
export default RouteTemplate(<template>{{!-- template-lint-disable no-invalid-link-text --}}
<article class="chapter">
  {{#if (eq @controller.model.name "ember-data-overview")}}
    <h1 class="module-name">EmberData Overview</h1>
  {{else}}
    <h1 class="module-name">Package {{@controller.model.name}}</h1>
  {{/if}}
  {{#if @controller.model.access}}<span class="access">{{@controller.model.access}}</span>{{/if}}

  <p class="attributes">
    {{#if @controller.model.parent}}
      <div class="attribute">
        <span class="attribute-label">Parent:</span>
        <span class="attribute-value"><LinkTo @route="project-version.modules.module" @models={{array @controller.model.projectVersion.compactVersion @controller.model.parent}}>{{@controller.model.parent}}</LinkTo></span>
      </div>
    {{/if}}
  </p>

  <p class="description"><MarkdownToHtml @markdown={{@controller.model.description}} /></p>

  {{#if @controller.submodules}}
    <section>
      <h2 id="submodules" class="anchorable-toc">
        <a href="#submodules" class="toc-anchor"></a>
        Submodules
      </h2>
      <ul class="spec-method-list">
        {{#each @controller.submodules as |module|}}
          <li>
            <LinkTo @route="project-version.modules.module" @model={{module}}>
              {{module}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    </section>
  {{/if}}

  {{#if @controller.classesAndNamespaces}}
    <section>
      <h2 id="classes" class="anchorable-toc">
        <a href="#classes" class="toc-anchor"></a>
        Classes
      </h2>
      <ul class="spec-property-list">
        {{#each @controller.classesAndNamespaces as |klass|}}
          {{#if (not (and (eq @controller.model.name "ember-data") (eq klass "Ember")))}}
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

  {{#if (and @controller.functionHeadings (gt @controller.functionHeadings.length 0))}}

    <h2 id="functions" class="anchorable-toc">
      <a href="#functions" class="toc-anchor"></a>
      Functions
    </h2>
    {{#each @controller.functionHeadings as |funcHeading|}}
      <h4 id="{{functionHeadingId funcHeading}}" class="anchorable-toc">
        <a href="#{{functionHeadingId funcHeading}}" class="toc-anchor"></a>
        {{funcHeading}}
      </h4>
      <ul class="spec-method-list">
        {{#each (betterGet @controller.functions funcHeading) as |method|}}
          <li>
            <LinkTo @route="project-version.functions.function" @models={{array @controller.model.project.id @controller.model.projectVersion.compactVersion funcHeading method.name}}>
              {{method.name}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    {{/each}}

  {{/if}}
  {{outlet}}

</article>
</template>)