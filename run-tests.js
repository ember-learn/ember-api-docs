const spawn = require('spawndamnit');
const ember = `./node_modules/.bin/ember`;

const userName = process.env['BROWSERSTACK_USERNAME']
const accessKey = process.env['BROWSERSTACK_ACCESS_KEY']

const canConnectToBrowserStack =  (
  userName && userName.trim().length !== 0 &&
  accessKey && accessKey.trim().length !== 0
);

const hookupLoggers = (proc) => {
  proc.on('stdout', data => console.log(data.toString()));
  proc.on('stderr', data => console.error(data.toString()));
};

const execEmberProcess = async (cmd) => {
  let proc = spawn(ember, [cmd]);
  hookupLoggers(proc);
  try {
    await proc;
  } catch (e) {
    return process.exit(1);
  }
};

(async () => {
  if (canConnectToBrowserStack) {
    await execEmberProcess('browserstack:connect');
  }

  await execEmberProcess('exam');

  if (canConnectToBrowserStack) {
    if (process.env['TRAVIS_JOB_NUMBER']) {
      await execEmberProcess('browserstack:results');
    }
    await execEmberProcess('browserstack:disconnect');
  }

})();
