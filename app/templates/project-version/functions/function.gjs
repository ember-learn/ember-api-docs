import pageTitle from "ember-page-title/helpers/page-title";
import ClassFieldDescription from "ember-api-docs/components/class-field-description";
<template>{{pageTitle @model.fn.name}}
<article class="chapter">
  <h1 class="module-name">Function</h1>
  <hr>
  <ClassFieldDescription @type="method" @field={{@model.fn}} @model={{@model.fnModule}} />
</article>
</template>