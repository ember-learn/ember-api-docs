import Controller from '@ember/controller';
import config from 'ember-api-docs/config/environment';

const links = [
  {
    name: 'Docs',
    type: 'dropdown',
    items: [
      {
        href: 'https://guides.emberjs.com',
        name: 'Ember.js Guides',
        type: 'link'
      },
      {
        href: config.APP.domain,
        name: 'API Reference',
        type: 'link'
      },
      {
        href: 'https://cli.emberjs.com',
        name: 'CLI Guides',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberjs.com/learn',
        name: 'Learn Ember',
        type: 'link'
      }
    ]
  },
  {
    name: 'Releases',
    type: 'dropdown',
    items: [
      {
        href: 'https://emberjs.com/builds',
        name: 'Channels',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/builds/release',
        name: '-- Stable',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/builds/beta',
        name: '-- Beta',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/builds/canary',
        name: '-- Canary',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberjs.com/deprecations',
        name: 'Deprecations',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/statusboard',
        name: 'Status Board',
        type: 'link'
      }
    ]
  },
  {
    href: 'https://emberjs.com/blog',
    name: 'Blog',
    type: 'link'
  },
  {
    name: 'Community',
    type: 'dropdown',
    items: [
      {
        href: 'https://emberjs.com/community',
        name: 'The Ember Community',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/guidelines',
        name: 'Guidelines',
        type: 'link'
      },
      {
        href: 'https://github.com/emberjs/',
        name: 'Contribute (Github)',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberjs.com/community/meetups',
        name: 'Meetups',
        type: 'link'
      },
      {
        href: 'https://jobs.emberjs.com/',
        name: 'Job Board',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberconf.com/',
        name: 'Ember Conf',
        type: 'link'
      }
    ]
  },
  {
    name: 'About',
    type: 'dropdown',
    items: [
      {
        href: 'https://emberjs.com/team',
        name: 'The Team',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberjs.com/logos',
        name: 'Logos',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/mascots',
        name: 'Mascots',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberjs.com/ember-users',
        name: 'Who Uses Ember',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/sponsors',
        name: 'Sponsors',
        type: 'link'
      },
      {
        type: 'divider'
      },
      {
        href: 'https://emberjs.com/legal',
        name: 'Legal',
        type: 'link'
      },
      {
        href: 'https://emberjs.com/security',
        name: 'Security',
        type: 'link'
      }
    ]
  }
];

export default Controller.extend({
  links,
});
