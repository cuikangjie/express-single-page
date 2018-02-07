const path = require('path');
const cp = require('child_process')
const {
  nodeConfig,
  viewConfig
} = require('./webpack.config');

const {
  watch,
  format,
  cleanFile,
  copyFile
} = require('kin-toolkits').tools

const resolve = file => path.resolve(__dirname, file)


// 启动服务
let server,flag = false;

// 回调重启服务
const restart = () => {
  if (server) {
    server.kill('SIGTERM');
  }
  server = cp.spawn('node', ['./build/app.js']);
  server.stdout.on('data', (data) => {
    const time = new Date().toTimeString();
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);
  });
  server.stderr.on('data', x => {
    process.stderr.write(x)
  });
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

const run = async ()=>{
  await watch(viewConfig,()=>{
    console.log('build view success');
  },async ()=>{
    // 删除文件
    await cleanFile('build/view/*')
  })

  await watch(nodeConfig,()=>{
    flag = true
    console.log('build node success');
    restart();
  })

}

cleanFile('build/*').then(async (value) => {
  run()
})
