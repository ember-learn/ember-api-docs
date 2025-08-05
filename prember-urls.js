const { readdirSync, existsSync } = require('fs');
const cmp = require('semver-compare');
// eslint-disable-next-line node/no-extraneous-require
const semver = require('semver');

function partialUrlEncode(input) {
  return input.replace(/\//g, '%2F');
}

const singularData = {
  classes: 'class',
  namespaces: 'namespace',
  modules: 'module',
};

module.exports = function () {
  const projects = readdirSync('ember-api-docs-data/json-docs');

  const urls = [];

  projects.forEach((p) => {
    // add release index for each of the projects
    urls.push(`/${p}/release`);

    const fullProjectVersions = readdirSync(
      `ember-api-docs-data/json-docs/${p}`
    ).filter((v) => !!semver.valid(v));

    // add landing page for each of the projects versions
    const projectVersions = fullProjectVersions
      .map((v) => {
        let parsed = semver.parse(v);
        if (!parsed) return null;
        if (parsed.prerelease && parsed.prerelease.length > 0) {
          return `${parsed.major}.${parsed.minor}.${
            parsed.patch
          }-${parsed.prerelease.join('.')}`;
        }
        return `${parsed.major}.${parsed.minor}`;
      })
      .filter(Boolean);

    const uniqueProjectVersions = [...new Set(projectVersions)];

    const addUrl = (p, uniqVersion, suffix) => {
      // If it's the latest release version, also create release URLs
      if (projectVersions[projectVersions.length - 1] === uniqVersion) {
        urls.push(`/${p}/release/${suffix}`);
      }
      urls.push(`/${p}/${uniqVersion}/${suffix}`);
    };

    const oldVersions = [
      '1.13',
      '2.18',
      '3.28',
      '4.4',
      '4.8',
      '4.12',
      '5.4',
      '5.8',
      '5.12',
    ];

    uniqueProjectVersions.forEach((uniqVersion) => {
      let isPreRelease = uniqVersion.includes('-');
      let baseVersion = isPreRelease ? uniqVersion.split('-')[0] : uniqVersion;

      if (
        !oldVersions.includes(baseVersion) &&
        !semver.valid(`${baseVersion}.0`)
      ) {
        return;
      }
      if (
        !oldVersions.includes(baseVersion) &&
        !semver.gte(`${baseVersion}.0`, '6.0.0')
      ) {
        return;
      }

      urls.push(`/${p}/${uniqVersion}`);

      const sortedPatchVersions = fullProjectVersions
        .filter((projectVersion) => {
          let parsed = semver.parse(projectVersion);
          if (!parsed) return false;
          if (isPreRelease) {
            return (
              `${parsed.major}.${parsed.minor}.${
                parsed.patch
              }-${parsed.prerelease.join('.')}` === uniqVersion
            );
          } else {
            return `${parsed.major}.${parsed.minor}` === uniqVersion;
          }
        })
        .sort(cmp);

      const highestPatchVersion =
        sortedPatchVersions[sortedPatchVersions.length - 1];

      if (!highestPatchVersion) return;

      const revIndex = require(`${__dirname}/ember-api-docs-data/rev-index/${p}-${highestPatchVersion}.json`);

      ['classes', 'namespaces', 'modules'].forEach((entity) => {
        // add classes
        revIndex.data.relationships[entity].data.forEach(({ id }) => {
          const [, cleanId] = id.match(/^.+-\d+\.\d+\.\d+-(.*)/);
          addUrl(p, uniqVersion, `${entity}/${partialUrlEncode(cleanId)}`);

          const fileName = revIndex.meta[singularData[entity]][id];
          let entityData;

          if (fileName !== undefined) {
            // rare cases when very strange things make it through this far
            // e.g. ember-3.0.0-ember%0A%0ARemove%20after%203.4%20once%20_ENABLE_RENDER_SUPPORT%20flag%20is%20no%20longer%20needed.
            // 🤷‍♀️
            const requirePath = `${__dirname}/ember-api-docs-data/json-docs/${p}/${highestPatchVersion}/${entity}/${fileName}.json`;
            if (!existsSync(requirePath)) {
              // TODO we really shouldn't come across this so we should investigate why there are things in the rev-index that don't have corresponding files
              console.log(
                `about to require ${requirePath} but that file doesn't exist`
              );
              return;
            }
            entityData = require(requirePath);
          }

          if (entity === 'modules' && entityData) {
            const staticFunctions = entityData.data.attributes.staticfunctions;

            Object.keys(staticFunctions).forEach((k) => {
              const listOfFunctions = staticFunctions[k];

              listOfFunctions.forEach((func) => {
                addUrl(
                  p,
                  uniqVersion,
                  `functions/${encodeURIComponent(func.class)}/${func.name}`
                );
              });
            });
          }

          // TODO review that we have got all the URLs that we care about

          // TODO discuss only prembering "supported" versions - maybe last version in a major and supported versions
          // alternative is to rely on netlify complex build
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
