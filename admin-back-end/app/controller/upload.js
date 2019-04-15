'use strict';
// app/controller/upload.js
const path = require('path');
const Controller = require('egg').Controller;
const fs = require('fs');

module.exports = class extends Controller {
  async upload() {
    const { ctx } = this;
    // file not exists will response 400 error
    const stream = await ctx.getFileStream();

    const savePath = path.join(__dirname,'../public/files',stream.filename);
    var writeStream = fs.createWriteStream(savePath);
    stream.pipe(writeStream);
    stream.on('end', () => {
      console.log('There will be no more data.');
      writeStream.end();
    });

    ctx.body = {
        success:true,
        path:`http://127.0.0.1:7001/public/files/${stream.filename}`
    };
  }
};
