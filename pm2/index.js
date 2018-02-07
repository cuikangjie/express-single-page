import nodeStart from 'kin-toolkits/pm2/index.js';

const pkg = require('../package.json')
const config ={
  "name"        : pkg.name,
  "script"      : "./app.js",
  "watch"       : false,
  "env": {
      "PORT": "9090"
  }
}
nodeStart(config)
