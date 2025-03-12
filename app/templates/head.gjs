import RouteTemplate from 'ember-route-template'

export default RouteTemplate(<template><title>{{@controller.model.title}}</title>

<link rel="dns-prefetch" href="{{@controller.model.cdnDomain}}">
<meta property="og:title" content={{@controller.model.title}}>

{{#if @controller.model.description}}
  <meta name="description" content={{@controller.model.description}}>
  <meta property="og:description" content={{@controller.model.description}}>
{{/if}}
{{#unless @controller.model.isRelease}}
  <link rel="canonical" href={{@controller.model.canonicalUrl}}>
{{/unless}}</template>)