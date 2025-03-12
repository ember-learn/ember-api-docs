{{! template-lint-disable no-inline-styles }}
{{!-- Template is copied from project-version.hbs --}}
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
</aside>
<section class="content">
  <article class="chapter">
    <h1>Ember CLI API Documentation</h1>
    <p>Ember CLI API documentation is available on <a href="https://ember-cli.com/api">ember-cli.com/api</a>.</p>
  </article>
</section>
