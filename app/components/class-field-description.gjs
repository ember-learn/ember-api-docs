/* eslint-disable prettier/prettier */
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from "@ember/modifier";
import { fn, array, concat } from "@ember/helper";
import svgJar from "ember-svg-jar/helpers/svg-jar";
import join from "ember-composable-helpers/helpers/join";
import mapBy from "ember-composable-helpers/helpers/map-by";
import { LinkTo } from "@ember/routing";
import githubLink from "ember-api-docs/helpers/github-link";
import and from "ember-truth-helpers/helpers/and";
import eq from "ember-api-docs/helpers/eq";
import ImportExample from "ember-api-docs/components/import-example";
import MarkdownToHtml from "ember-cli-showdown/components/markdown-to-html";

export default class ClassFieldDescription extends Component {<template><section class="{{@type}}">
  {{!-- TODO: Fix this link for a11y --}}
  <h3 class="class-field-description--link" data-anchor="{{@field.name}}" role="link" {{on "click" (fn this.updateAnchor @field.name)}}>
    <a class="anchor" {{!-- template-lint-disable link-href-attributes --}}>
      {{svgJar "fa-link" class="class-field-description--link-hover" width="20px" height="20px"}}
    </a>
    <span class="{{@type}}-name">{{@field.name}}</span>
    {{#if @field.params}}
      <span class="args">
        ({{join ", " (mapBy "name" @field.params)}})
      </span>
    {{/if}}
    {{#if @field.return}}
      <span class="return-type">{{@field.return.type}}</span>
    {{/if}}
    {{#if @field.access}}
      <span class="access">{{@field.access}}</span>
    {{/if}}
    {{#if @field.deprecated}}
      <span class="access">deprecated</span>
    {{/if}}
  </h3>
  {{#if @model.module}}
    <div class="attributes">
      <div class="attribute">
        <span class="attribute-label">Module:</span>
        <span class="attribute-value"><LinkTo @route="project-version.modules.module" @models={{array @model.projectVersion.compactVersion @model.module}}>{{@model.module}}</LinkTo></span>
      </div>
    </div>
  {{/if}}
  <p class="github-link" data-test-file={{@field.file}}>
    {{#if @field.inherited}}
      Inherited from
      <a href="{{githubLink @model.project.id @model.projectVersion.version @field.file @field.line}}" target="_blank" rel="noopener noreferrer">
        {{@field.inheritedFrom}} {{@field.file}}:{{@field.line}}
      </a>
    {{else}}
      Defined in
      <a href="{{githubLink @model.project.id @model.projectVersion.version @field.file @field.line}}" target="_blank" rel="noopener noreferrer">
        {{@field.file}}:{{@field.line}}
      </a>
    {{/if}}
  </p>
  {{#if @field.since}}
    <p class="field-since">
      Available since v{{@field.since}}
    </p>
  {{/if}}
  {{#if (and (eq @field.static 1) (eq @field.itemtype "method") this.hasImportExample)}}
    <ImportExample @item={{concat "{ " @field.name " }"}} @package={{@field.class}} />
  {{/if}}
  <dl class="parameters">
    {{#each @field.params as |param|}}
      <div class="parameter">
        <dt>{{param.name}}</dt>
        <dd class="parameter-type">{{param.type}}</dd>
        <dd><MarkdownToHtml @markdown={{param.description}} /></dd>
        {{#if param.props}}
          <dl class="parameters">
            {{#each param.props as |prop|}}
              <div class="prop">
                <dt>{{prop.name}}</dt>
                <dd class="parameter-type">{{prop.type}}</dd>
                <dd><MarkdownToHtml @markdown={{prop.description}} /></dd>
              </div>
            {{/each}}
          </dl>
        {{/if}}
      </div>
    {{/each}}
    {{#if @field.return}}
      <div class="return">
        <dt>returns</dt>
        <dd class="return-type">{{@field.return.type}}</dd>
        <dd><MarkdownToHtml @markdown={{@field.return.description}} /></dd>
      </div>
    {{/if}}
  </dl>
  <MarkdownToHtml @markdown={{@field.description}} />
</section></template>
  @service
  legacyModuleMappings;

  get hasImportExample() {
    return this.legacyModuleMappings.hasFunctionMapping(
      this.args.field.name,
      this.args.field.class
    );
  }

  /**
   * Callback for updating the anchor with the field name that was clicked by a user.
   *
   * @method updateAnchor
   * @method fieldName String The name representing the field that was clicked.
   */
  @action
  updateAnchor(fieldName) {
    this.args.updateAnchor?.(fieldName);
  }
}
