{{! template-lint-disable no-invalid-interactive }}
<section class='class-field-description {{@type}}'>
  <h3 id='{{@field.name}}' class="class-field-description--header">
    <span class="signature">
      <span class='{{@type}}-name'>
        {{@field.name}}
      </span>
      {{#if @field.params}}(<span class='args'>{{join ', ' (map-by 'name' @field.params)}}</span>){{/if}}
      {{#if @field.return}}
        : <span class='return-type'>{{@field.return.type}}</span>
      {{/if}}
    </span>
    {{#if @field.access}}
      <span class='access'>{{@field.access}}</span>
    {{/if}}
    {{#if @field.deprecated}}
      <span class='access'>deprecated</span>
    {{/if}}
    <a class='class-field-description--link' href="#{{@field.name}}" aria-label="Jump to {{@field.name}}">
      {{svg-jar 'link' width='20px' height='20px' aria-hidden='true'}}
    </a>
  </h3>
  {{#if @model.module}}
    <div class='attributes'>
      <div class='attribute'>
        <span class='attribute-label'>Module:</span>
        <span class='attribute-value'><LinkTo @route='project-version.modules.module' @models={{array @model.projectVersion.compactVersion @model.module}}>{{@model.module}}</LinkTo></span>
      </div>
    </div>
  {{/if}}
  <p class='github-link' data-test-file={{@field.file}}>
    {{#if @field.inherited}}
      Inherited from
      <a href='{{github-link @model.project.id @model.projectVersion.version @field.file @field.line}}' target='_blank' rel='noopener noreferrer'>
        {{@field.inheritedFrom}} {{@field.file}}:{{@field.line}}
      </a>
    {{else}}
      Defined in
      <a href='{{github-link @model.project.id @model.projectVersion.version @field.file @field.line}}' target='_blank' rel='noopener noreferrer'>
        {{@field.file}}:{{@field.line}}
      </a>
    {{/if}}
  </p>
  {{#if @field.since}}
    <p class='field-since'>
      Available since v{{@field.since}}
    </p>
  {{/if}}
  {{#if (and (eq @field.static 1) (eq @field.itemtype 'method') this.hasImportExample)}}
    <ImportExample @item={{concat '{ ' @field.name ' }'}} @package={{@field.class}}/>
  {{/if}}
  <dl class='parameters'>
    {{#each @field.params as |param|}}
      <div class='parameter'>
        <dt>{{param.name}}</dt>
        <dd class='parameter-type'>{{param.type}}</dd>
        <dd><MarkdownToHtml @markdown={{param.description}} /></dd>
        {{#if param.props}}
          <dl class='parameters'>
            {{#each param.props as |prop|}}
              <div class='prop'>
                <dt>{{prop.name}}</dt>
                <dd class='parameter-type'>{{prop.type}}</dd>
                <dd><MarkdownToHtml @markdown={{prop.description}} /></dd>
              </div>
            {{/each}}
          </dl>
        {{/if}}
      </div>
    {{/each}}
    {{#if @field.return}}
      <div class='return'>
        <dt>returns</dt>
        <dd class='return-type'>{{@field.return.type}}</dd>
        <dd><MarkdownToHtml @markdown={{@field.return.description}} /></dd>
      </div>
    {{/if}}
  </dl>
  <MarkdownToHtml @markdown={{@field.description}} />
</section>
