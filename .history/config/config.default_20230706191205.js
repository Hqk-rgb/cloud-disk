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
  config.middleware = ["errorHandler"];

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

  config.crypto = {
    secret: "qhdgw@45ncashdasksh2!#",
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
