import pageTitle from 'ember-page-title/helpers/page-title';
import EsSidebar from 'ember-styleguide/components/es-sidebar';
import TableOfProjects from 'ember-api-docs/components/table-of-projects';
<template>
  {{pageTitle "Ember CLI - Ember API Documentation"}}

  <div class="sidebar-container sidebar-container--full-width">
    <EsSidebar><TableOfProjects @activeProject="ember-cli" /></EsSidebar>
    <section class="content">
      <article class="chapter">
        <h1>Ember CLI API Documentation</h1>
        <hr />
        <p>Ember CLI API documentation is available on
          <a href="https://ember-cli.com/api">ember-cli.com/api</a>.</p>
      </article>
    </section>
  </div>
</template>
