const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const  pkg = require('../package.json') ;
const {
  build,
  format,
  cleanFile,
  copyFile,
  writeFile
} = require('kin-toolkits').tools

const {
  nodeConfig,
  viewConfig
} = require('./webpack.config');

async function run() {
  console.log(`${format(new Date())}  start build \n`);


  await build(viewConfig).then(() => {
    console.log('view build success !\n\n');
  }).catch((err) => {
    console.log('client', err);
  })

  await build(nodeConfig).then(() => {
    console.log('node build success !\n');
  }).catch((err) => {
    console.log('node', err);
  })

  console.log(`${format(new Date())}  Finished build`);
}

cleanFile(resolve('../build/*')).then(async(value) => {
  await writeFile(resolve('../build/package.json'), JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies:  pkg.dependencies,
    scripts: {
      start: 'node ./start.js && pm2 list'
    },
  }, null, 2)),

  // await copyFile(resolve('../yarn.lock'), resolve('../build/yarn.lock'))

  run()
})
