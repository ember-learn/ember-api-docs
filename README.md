# Ember-api-docs

This app is used to produce versioned Ember api docs.  To view the data generator producing its data, please visit https://github.com/ember-learn/ember-jsonapi-docs

## Development setup 

- Setup any valid AWS key values in your environment
  - `export AWS_ACCESS_KEY=xxxx`
  - `export AWS_SECRET_KEY=yyyy`
- Run `npm run sync-docs` to download the json docs. This will download about **500MB+** docs to your local. 
  - If you wanna go green with lesser docs, generate fewer docs on your local following [these instructions](https://github.com/ember-learn/ember-jsonapi-docs#to-generate-docs-for-a-specific-project-andor-version-for-development) & then move the `tmp/json-docs` from that project into this project's `public/json-docs` folder
