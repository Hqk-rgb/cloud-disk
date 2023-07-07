/* eslint valid-jsdoc: "off" */
/* eslint-disable */
"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1688541630680_500";

  // add your middleware config here
  config.middleware = ["errorHandler", "auth"];

  config.security = {
    // 关闭csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    // domainWhiteList: ["http://loaclhost:3000"],
  };

  // 允许跨域的方法
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.sequelize = {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    database: "cloud_disk",
    username: "root",
    password: "123456",
    timezone: "+08:00",
    define: {
      //取消数据表名复数
      freezeTableName: true,
      //自动写入时间戳
      timestamps: true,
      createdAt: "created_time",
      updatedAt: "updated_time",
      underscored: true,
    },
  };

  config.valparams = {
    locale: "zh-cn",
    throwError: true,
  };

  //crypto加密秘钥
  config.crypto = {
    secret: "qhdgw@45ncashdaksh2!#@3nxjdas*_672",
  };

  //这些接口请求需要token
  config.auth = {
    match: ["/logout", "/upload", "/getSize", "/file", "/share"],
  };

  //redis存储
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "",
      db: 1,
    },
  };

  config.oss = {
    client: {
      accessKeyId: "LTAI5tPr81ofKDqjFNPcCRqM",
      accessKeySecret: "e9rsuHOJunSIjhRiZomOxIkiETcEt4",
      bucket: "king-hf-bucket",
      endpoint: "oss-cn-shanghai.aliyuncs.com",
      timeout: "60s",
    },
  };

  //上传格式和大小限制
  config.multipart = {
    fileSize: "1048576000",
    mode: "file",
    fileExtensions: [
      // 允许上传的图片类型
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".wbmp",
      ".webp",
      ".tif",
      ".psd",
      // 允许上传的文本类型
      ".svg",
      ".js",
      ".jsx",
      ".json",
      ".css",
      ".less",
      ".html",
      ".htm",
      ".xml",
      ".txt",
      ".doc",
      ".docx",
      ".md",
      ".pdf",
      ".xls",
      ".xlsx",
      // 允许上传的压缩文件类型
      ".zip",
      ".gz",
      ".tgz",
      ".gzip",
      // 允许上传的音视频文件类型
      ".mp3",
      ".mp4",
      ".avi",
    ],
  };

  //jwt配置
  config.jwt = {
    secret: "qhdgw@45ncashdaksh2!#@3nxjdas*_672",
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
