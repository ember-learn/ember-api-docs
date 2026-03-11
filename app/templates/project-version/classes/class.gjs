import pageTitle from "ember-page-title/helpers/page-title";
import and from "ember-truth-helpers/helpers/and";
import isLatest from "ember-api-docs/helpers/is-latest";
import githubLink from "ember-api-docs/helpers/github-link";
import svgJar from "ember-svg-jar/helpers/svg-jar";
import { LinkTo } from "@ember/routing";
import { array, fn } from "@ember/helper";
import notEq from "ember-truth-helpers/helpers/not-eq";
import not from "ember-truth-helpers/helpers/not";
import eq from "ember-api-docs/helpers/eq";
import ImportExample from "ember-api-docs/components/import-example";
import MarkdownToHtml from "ember-cli-showdown/components/markdown-to-html";
import Methods from "ember-api-docs/components/methods";
import Properties from "ember-api-docs/components/properties";
import Events from "ember-api-docs/components/events";
import or from "ember-truth-helpers/helpers/or";
import ApiIndexFilter from "ember-api-docs/components/api-index-filter";
import ApiIndex from "ember-api-docs/components/api-index";
<template>{{!-- template-lint-disable no-action --}}
{{pageTitle @model.name}}

<article class="chapter">
  <div class="article-title-wrapper">
    <h1 class="module-name">Class {{@model.name}}
      {{#if @model.access}}
        <span class="access">{{@model.access}}</span>
      {{/if}}
    </h1>
    {{#if (and @model.project.id @model.file @model.line (isLatest version=@model.projectVersion.version allVersions=@controller.allVersions))}}
      <a data-tooltip="Edit on Github" class="edit-icon" href="{{githubLink @model.project.id @model.projectVersion.version @model.file @model.line isEdit=true}}" target="_blank" rel="noopener noreferrer">{{svgJar "pen"}}</a>
    {{/if}}
  </div>
  <hr>
  <div class="attributes">
    {{#if @model.extends}}
      <div class="attribute">
        <span class="attribute-label">Extends:</span>
        <span class="attribute-value">
          <LinkTo @route="project-version.classes.class" @models={{array @model.extendedClassProjectName @model.projectVersion.compactVersion @model.extendedClassShortName}} data-test-extends-link>
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
            {{#if (notEq idx 0)}}<span class="comma">,</span>{{/if}}
            <LinkTo @route="project-version.classes.class" @models={{array parentClass.projectId @model.projectVersion.compactVersion parentClass.shortName}} data-test-uses-link>{{parentClass.name}}</LinkTo>
          {{/each}}
        </span>
      </div>
    {{/if}}
    {{#if @model.file}}
      <div class="attribute">
        <span class="attribute-label">Defined in:</span>
        <span class="attribute-value">
          <a href="{{githubLink @model.project.id @model.projectVersion.version @model.file @model.line}}" target="_blank" rel="noopener noreferrer">{{@model.file}}:{{@model.line}}</a>
        </span>
      </div>
    {{/if}}
    {{#if @model.module}}
      <div class="attribute">
        <span class="attribute-label">Module:</span>
        <span class="attribute-value">
          <LinkTo @route="project-version.modules.module" @models={{array @model.projectVersion.compactVersion @model.module}}>
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
  {{#if (and (not (eq @controller.static 1)) @controller.hasImportExample)}}
    <ImportExample @item={{@model.name}} @package={{@controller.module}} />
  {{/if}}
  <p class="description"><MarkdownToHtml @markdown={{@model.description}} /></p>
  <hr>
  {{#if @model.methods}}
  <h2>Methods</h2>
  <Methods @model={{@model}} @filterData={{@controller.filterData}} />
  {{/if}}
  {{#if @model.properties}}
  <h2>Properties</h2>
  <Properties @model={{@model}} @filterData={{@controller.filterData}} />
  {{/if}}
  {{#if @model.events}}
  <h2>Events</h2>
  <Events @model={{@model}} @filterData={{@controller.filterData}} />
  {{/if}}
</article>
<div class="on-this-page-wrapper">
    <div class="on-this-page-wrapper-header">On this page</div>
    <hr>
{{#if (or @model.methods @model.properties @model.events)}}
    <div class="tabbed-layout">
      <section class="access-checkbox-list">
        <label class="access-checkbox">
          <input id="inherited-toggle" data-test-checkbox="inherited" type="checkbox" checked={{@controller.filterData.showInherited}} onchange={{fn @controller.updateFilter "showInherited"}}>
          Inherited
        </label>
        <label class="access-checkbox">
          <input id="protected-toggle" data-test-checkbox="protected" type="checkbox" checked={{@controller.filterData.showProtected}} onchange={{fn @controller.updateFilter "showProtected"}}>
          Protected
        </label>
        <label class="access-checkbox">
          <input id="private-toggle" data-test-checkbox="private" type="checkbox" checked={{@controller.filterData.showPrivate}} onchange={{fn @controller.updateFilter "showPrivate"}}>
          Private
        </label>
        <label class="access-checkbox">
          <input id="deprecated-toggle" data-test-checkbox="deprecated" type="checkbox" checked={{@controller.filterData.showDeprecated}} onchange={{fn @controller.updateFilter "showDeprecated"}}>
          Deprecated
        </label>
      </section>
      <hr>
    </div>
    <ApiIndexFilter @model={{@controller.model}} @filterData={{@controller.filterData}} as |filteredModel|>
  <ApiIndex @itemData={{filteredModel}} @classNames="api__index__content" as |sectionData|>
    {{#each sectionData.sections as |section|}}
      {{#if section.items}}
      <h3 class="api-index-section-title">{{section.title}}</h3>
        <ul class="{{section.class}}">
          {{#each section.items as |item|}}
            <li data-test-item={{item.name}}>
              <a href="#{{item.name}}">
                {{item.name}}
              </a>
            </li>
          {{/each}}
        </ul>
      {{/if}}
    {{/each}}
  </ApiIndex>
</ApiIndexFilter>
  {{/if}}
</div>
</template>