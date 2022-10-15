const { readdirSync } = require('fs');
const cmp = require('semver-compare');
const semver = require('semver');

module.exports = function () {
  const projects = readdirSync('ember-api-docs-data/json-docs');

  const urls = [];

  projects.forEach((p) => {
    // add release for each of the projects
    urls.push(`/${p}/release`);

    const fullProjectVersions = readdirSync(
      `ember-api-docs-data/json-docs/${p}`
    ).filter((v) => v.match(/\d+\.\d+\.\d+/));

    // add landing page for each of the projects versions
    const projectVersions = fullProjectVersions.map((v) => {
      let [, major, minor] = v.match(/(\d+)\.(\d+)\.\d+/);
      return `${major}.${minor}`;
    }); // uniq

    const uniqueProjectVersions = [...new Set(projectVersions)];

    uniqueProjectVersions.forEach((uniqVersion) => {
      urls.push(`/${p}/${uniqVersion}`);

      const sortedPatchVersions = fullProjectVersions
        .filter((projectVersion) => {
          // console.log("comparing", projectVersion, uniqVersion, semver.satisfies(projectVersion, uniqVersion))
          return semver.satisfies(projectVersion, uniqVersion);
        })
        .sort(cmp);

      const highestPatchVersion =
        sortedPatchVersions[sortedPatchVersions.length - 1];

      const revIndex = require(`${__dirname}/ember-api-docs-data/rev-index/${p}-${highestPatchVersion}.json`);

      ['classes', 'namespaces', 'modules'].forEach((entity) => {
        // add classes
        revIndex.data.relationships[entity].data.forEach(({id}) => {
          const [, cleanId] = id.match(/^.+-\d+\.\d+\.\d+-(.*)/);
          urls.push(`/${p}/${uniqVersion}/${entity}/${cleanId}`);
          urls.push(`/${p}/${uniqVersion}/${entity}/${cleanId}/methods`);
          urls.push(`/${p}/${uniqVersion}/${entity}/${cleanId}/properties`);
          urls.push(`/${p}/${uniqVersion}/${entity}/${cleanId}/events`);
        });
      });
    });
  });

  return urls;
};

// this is useful to debug why a url isn't being prembered
// DEBUG=prember-urls node prember-urls.js
if (process.env.DEBUG === 'prember-urls') {
  let urls = module.exports();

  urls.forEach((url) => console.log(url));

  console.log(`\n${urls.length} total URLs`);
}
