/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555296161510_4395';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    multipart:{
      fileSize: '50mb',
      fileExtensions: [
        '.zip',
        '.pdf',
        '.xlsx',
        '.docx',
        '.js',
        '.css',
        '.jsx',
        '.txt',
        '.log',
      ],
    },
    security :{
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: ['*']
    },
    cors :{
      origin:'*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
