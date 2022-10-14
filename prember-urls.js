const { readdirSync } = require('fs');

module.exports = function () {
  const projects = readdirSync('ember-api-docs-data/json-docs');

  const urls = [];

  projects.forEach((p) => {
    // add release for each of the projects
    urls.push(`/${p}/release`);

    // add landing page for each of the projects versions
    const projectVersions = readdirSync(`ember-api-docs-data/json-docs/${p}`)
      .filter((v) => v.match(/\d+\.\d+\.\d+/))
      .map((v) => {
        let [, major, minor] = v.match(/(\d+)\.(\d+)\.\d+/);
        return `${major}.${minor}`;
      }); // uniq

    [...new Set(projectVersions)].forEach((v) => {
      urls.push(`/${p}/${v}`);
    });
  });

  return urls;
};

// this is useful to debug why a url isn't being prembered
// DEBUG=prember-urls node prember-urls.js
if (process.env.DEBUG === 'prember-urls') {
  let urls = module.exports();

  urls.forEach((url) => console.log(url));
}
