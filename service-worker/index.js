
self.addEventListener('fetch', (event) => {
  let request = event.request;
  //goes away with static fetch
  if (request.url.startsWith('https://gaurav0.cloudant.com/docs/')) {
    console.log(request.url);
  }
  //listen for data GETs.  check cache, return cached version instead of fetching.
});

self.addEventListener('message', (event) => {
  let data = event.data;
  let project = event.data.project;
  let version = event.data.project_version;
  console.log(`Project: ${project}, Version: ${version}`);
  //fetch manifest, iterate urls, store in cache.
});
