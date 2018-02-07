const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')

const readFile = file => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
});

const config = require('./config')

app.use('/view',express.static(path.join(__dirname, 'view')));


app.use('/',(req, res, next) => {
  readFile(path.resolve(__dirname, './view/index.html')).then((value) => {
    res.send(value)
  }).catch((err) => {
    res.send('不小心出错了！')
  })
})

app.listen(config.port, ()=>{
  console.log(`server start ${config.port}`);
})
