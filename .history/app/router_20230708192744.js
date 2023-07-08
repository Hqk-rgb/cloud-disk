/* eslint-disable */
"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/list", controller.home.list);

  //用户注册
  router.post("/reg", controller.user.reg);
  //用户登录
  router.post("/login", controller.user.login);
  //退出登录
  router.post("/logout", controller.user.logout);
  //上传文件
  router.post("/upload", controller.file.upload);
  //剩余容量
  router.get("/getSize", controller.user.getSize);
  //文件列表
  router.get("/file", controller.file.list);
  //创建文件夹
  router.post("/file/createdir", controller.file.createdir);
  //重命名
  router.post("/file/rename", controller.file.rename);
  //批量删除文件
  router.post("/file/delete", controller.file.delete);
};
