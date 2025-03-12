<article class="whoops">
  {{#if (eq this.model.status 404)}}
    <h2 class="whoops__title">Ack! 404 friend, you're in the wrong place</h2>
    <div class="whoops__message">
      <p>
        This page wasn't found. Please try the <LinkTo @route="index">API docs page</LinkTo>.
        If you expected something else to be here, please file a <a href="https://github.com/ember-learn/ember-api-docs/issues/new" target="_blank" rel="noopener noreferrer">ticket</a>.
      </p>
    </div>
  {{else}}
    <h2 class="whoops__title">
      Whoops! Something went wrong.
    </h2>
  {{/if}}
</article>
