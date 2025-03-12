<article class="chapter">
  <h1>Ember API Documentation</h1>
  <p>
    To get started, choose a project (Ember or Ember Data) and a version
    from the dropdown menu. Ember has core methods used in any app, while Ember Data has
    documentation of the built-in library for making requests to a back end.
    If you're looking for documentation of the command line tool used to generate files, build your
    app, and more, visit <a href="https://cli.emberjs.com/">ember-cli</a>. The latest
    testing API is available at
    <a href="https://github.com/emberjs/ember-test-helpers/blob/master/API.md">ember-test-helpers</a>.
  </p>
  <h2>Commonly searched-for documentation</h2>
  <ul class="spec-method-list">
    {{! template-lint-disable no-potential-path-strings }}
    <li>Components - <LinkTo @route='project-version.classes.class' @model='Component'>Classic</LinkTo> or <LinkTo @route='project-version.modules.module' @model='@glimmer/component'>Glimmer</LinkTo>; a view that is completely isolated</li>
    <li><LinkTo @route='project-version.functions.function' @models={{array '@glimmer/tracking' 'tracked'}}>Tracked</LinkTo> - make your templates responsive to property updates</li>
    <li><LinkTo @route='project-version.classes.class' @model='ComputedProperty'>Computed Properties</LinkTo> - declare functions as properties</li>
    {{! template-lint-disable no-potential-path-strings }}
    <li><LinkTo @route='project-version.classes.class' @model='@ember/object/computed'>Computed Macros</LinkTo> - shorter ways of expressing certain types of computed properties</li>
    <li><LinkTo @route='project-version.classes.class' @model='EmberArray'>EmberArray</LinkTo> - contains methods like <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'EmberArray' 'forEach'}} @query={{hash anchor='forEach'}}>forEach</LinkTo> and <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'EmberArray' 'mapBy'}} @query={{hash anchor='mapBy'}}>mapBy</LinkTo> that help you iterate over Ember Objects</li>
    <li><LinkTo @route='project-version.classes.class' @model='EmberObject'>EmberObject</LinkTo> - the main base class for all Ember objects, including the <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'EmberObject' 'get'}} @query={{hash anchor='get'}}>get</LinkTo> and <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'EmberObject' 'set'}} @query={{hash anchor='set'}}>set</LinkTo> methods</li>
    <li><LinkTo @route='project-version.classes.class' @model='Ember.Templates.helpers'>Ember.Templates.helpers</LinkTo> - built-in functions that can be used in templates, such as the <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'Ember.Templates.helpers' 'each'}} @query={{hash anchor='each'}}>each</LinkTo>, <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'Ember.Templates.helpers' 'on'}} @query={{hash anchor='on'}}>on</LinkTo> and <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'Ember.Templates.helpers' 'fn'}} @query={{hash anchor='fn'}}>fn</LinkTo> helpers</li>
    <li><LinkTo @route='project-version.classes.class' @model='Helper'>Helpers</LinkTo> - a way to define custom display functions that are used in templates</li>
    <li><LinkTo @route='project-version.classes.class' @model='Route'>Route</LinkTo> - used to define individual routes, including the <LinkTo @route='project-version.classes.class.methods.method' @models={{array 'Route' 'model'}} @query={{hash anchor='model'}}>model</LinkTo> hook for loading data</li>
    <li><LinkTo @route='project-version.classes.class' @model='Service'>Service</LinkTo> - an Ember object that lives for the duration of the application, and can be made available in different parts of your application</li>
  </ul>
  <h2>Useful links</h2>
  <ul>
    <li>
      <h5>
        <a href="https://github.com/ember-learn/ember-api-docs">API Documentation Github Repository</a>
      </h5>
    </li>
    <li>
      <h5>
        <a href="https://guides.emberjs.com/release/getting-started/core-concepts/">Ember Core Concepts</a>
      </h5>
    </li>
  </ul>
</article>
