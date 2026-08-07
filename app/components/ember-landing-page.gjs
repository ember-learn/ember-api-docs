import { LinkTo } from '@ember/routing';
import { array } from '@ember/helper';
<template>
  <article class="chapter">
    <h1>Ember API Documentation</h1>
    <hr />
    <p>
      To get started, choose a project (Ember or Ember Data) and a version from
      the dropdown menu. Ember has core methods used in any app, while Ember
      Data has documentation of the built-in library for making requests to a
      back end. If you're looking for documentation of the command line tool
      used to generate files, build your app, and more, visit
      <a href="https://cli.emberjs.com/">ember-cli</a>.
    </p>
    <h2>Commonly searched-for documentation</h2>
    <ul class="spec-method-list">
      {{! template-lint-disable no-potential-path-strings }}
      <li>
        <LinkTo
          @route="project-version.modules.module"
          @model="@glimmer/component"
        >Components</LinkTo>
        also known as Glimmer Components. Components are reusable combinations
        of template and JavaScript.
      </li>
      <li>
        <LinkTo
          @route="project-version.functions.function"
          @models={{array "@glimmer/tracking" "tracked"}}
        >Tracked</LinkTo>
        - make your templates responsive to property updates
      </li>
      <li>
        <a
          href="https://guides.emberjs.com/release/components/template-tag-format/"
        >
          Template Tag Format
        </a>
        - the authoring format for components
      </li>
      <li>
        <LinkTo
          @route="project-version.modules.module"
          @model="@ember/helper"
        >Template Keywords and Helpers</LinkTo>
        - built-in keywords and importable helpers that can be used in
        templates, such as the
        <a href="/ember/{{@version}}/functions/Keywords/each">each</a>
        keyword and
        <a href="/ember/{{@version}}/functions/Keywords/on">on</a>
        modifier
      </li>
      <li>
        <LinkTo
          @route="project-version.classes.class"
          @model="Route"
        >Route</LinkTo>
        - used to define individual routes, including the
        <a href="/ember/{{@version}}/classes/Route#model">model</a>
        hook for loading data
      </li>
      <li>
        <a href="/ember/{{@version}}/classes/EmberRouter#map">Router#map</a>
        - used to define the structure of your application's routes
      </li>
      <li>
        <LinkTo
          @route="project-version.functions.function"
          @models={{array "@ember/routing" "LinkTo"}}
        >
          &lt;LinkTo/&gt;
        </LinkTo>
        - a built-in component for linking to a Route within your application
      </li>
      <li>
        <LinkTo
          @route="project-version.classes.class"
          @model="Service"
        >Service</LinkTo>
        - an Ember object that lives for the duration of the application, and
        can be made available in different parts of your application
      </li>
      <li>
        <LinkTo @route="project-version.classes.class" @model="RouterService">
          RouterService
        </LinkTo>
        - an injectable service that provides access to the router
      </li>
      <li>
        <a
          href="https://github.com/emberjs/ember-test-helpers/blob/master/API.md"
        >@ember/test-helpers</a>. - a package that provides the testing API for
        Ember, also see the
        <a href="https://guides.emberjs.com/release/testing/">Testing</a>
        guides.
      </li>
      <li>
        <LinkTo
          @route="project-version.functions.function"
          @models={{array "@glimmer/tracking" "cached"}}
        >cached</LinkTo>
        - a decorator for caching the result of the unusually expensive getters
      </li>
      <li>
        <LinkTo
          @route="project-version.functions.function"
          @models={{array "@ember/owner" "getOwner"}}
        >getOwner</LinkTo>
        - a function used to get the owner of an object in Ember's Dependency
        Injection system
      </li>
    </ul>

    <h2>Commonly reached for Classic documentation</h2>
    <p>These are Classic Ember concepts that have modern replacements but are
      still supported. Please avoid using them in new code.</p>
    <ul class="spec-method-list">
      {{! template-lint-disable no-potential-path-strings }}
      <li>
        <LinkTo @route="project-version.classes.class" @model="Component">
          Classic Ember Components</LinkTo>
        - use
        <LinkTo
          @route="project-version.modules.module"
          @model="@glimmer/component"
        >Glimmer Components</LinkTo>
        instead
      </li>
      <li>
        <LinkTo
          @route="project-version.classes.class"
          @model="ComputedProperty"
        >Computed Properties</LinkTo>
        - use
        <LinkTo
          @route="project-version.functions.function"
          @models={{array "@glimmer/tracking" "tracked"}}
        >Tracked</LinkTo>
        and
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get"
        >native getters</a>
        instead
      </li>
      {{! template-lint-disable no-potential-path-strings }}
      <li>
        <LinkTo
          @route="project-version.classes.class"
          @model="@ember/object/computed"
        >Computed Macros</LinkTo>
        - use Tracked,
        <LinkTo
          @route="project-version.modules.module"
          @model="@ember/reactive/collections"
        >Ember Reactive Collections</LinkTo>, and
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get"
        >native getters</a>
        instead
      </li>
      <li>
        <LinkTo @route="project-version.classes.class" @model="EmberArray">
          EmberArray
        </LinkTo>
        - use
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
        >native array</a>
        or
        <LinkTo
          @route="project-version.functions.function"
          @models={{array "@ember/reactive/collections" "trackedArray"}}
        >trackedArray</LinkTo>
        instead
      </li>
      <li>
        <LinkTo
          @route="project-version.classes.class"
          @model="EmberObject"
        >EmberObject</LinkTo>
        - the classic base class for all Ember objects; use
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
        >native classes
        </a>
        instead.
      </li>
      <li><LinkTo
          @route="project-version.classes.class"
          @model="Helper"
        >Helpers</LinkTo>
        - in modern Ember, helpers can be
        <a
          href="https://guides.emberjs.com/release/components/helper-functions/#toc_local-helper-functions"
        >defined as plain functions</a></li>
    </ul>

    <h2>Useful links</h2>
    <ul>
      <li>
        <h5>
          <a href="https://github.com/ember-learn/ember-api-docs">API
            Documentation Github Repository</a>
        </h5>
      </li>
      <li>
        <h5>
          <a
            href="https://guides.emberjs.com/release/getting-started/core-concepts/"
          >Ember Core Concepts</a>
        </h5>
      </li>
    </ul>
  </article>
</template>
