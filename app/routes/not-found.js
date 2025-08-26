import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NotFoundRoute extends Route {
  @service fastboot;

  beforeModel() {
    if (!this.fastboot.isFastBoot) {
      return;
    }

    this.fastboot.response.statusCode = 404;
  }

  redirect() {
    if (typeof window === 'undefined' || !window.location) {
      return;
    }
    const url = new URL(window.location.href);
    const anchor = url.searchParams.get('anchor');
    const redirected = url.searchParams.get('redirected');
    if (anchor && !redirected) {
      url.searchParams.set('redirected', '1');
      // If we get here with an anchor query param, it means something in the
      // api docs app is continuing to link to it (sometimes in the markdown)
      // Force full reload to get netlify redirects
      window.location.replace(url.toString());
      // A more elegant solution would be to restore the various routes that
      // handled ?anchor previously and redirect from there but that would
      // necessitate adding support to the Ember Router to redirect to #anchors
    }
  }
}
