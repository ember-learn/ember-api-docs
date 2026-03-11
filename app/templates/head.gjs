
<template><link rel="dns-prefetch" href="{{@controller.model.cdnDomain}}">

{{#if @controller.model.description}}
  <meta name="description" content={{@controller.model.description}}>
  <meta property="og:description" content={{@controller.model.description}}>
{{/if}}

{{#unless @controller.model.isRelease}}
  <link rel="canonical" href={{@controller.model.canonicalUrl}}>
{{/unless}}</template>