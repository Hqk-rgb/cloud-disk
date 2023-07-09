"use strict";
const common_vendor = require("./vendor.js");
const $H = {
  // 全局配置
  common: {
    baseUrl: "http://127.0.0.1:7001",
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: {},
    method: "GET",
    dataType: "json",
    token: false
  },
  // 请求返回promise
  request(options = {}) {
    options.url = this.common.baseUrl + options.url;
    options.header = options.header || this.common.header;
    options.data = options.data || this.common.data;
    options.method = options.method || this.common.method;
    options.dataType = options.dataType || this.common.dataType;
    options.token = options.token === true ? true : this.common.token;
    return new Promise((res, rej) => {
      if (options.token) {
        let token = common_vendor.index.getStorageSync("token");
        if (!token && options.noJump !== true) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "none"
          });
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
          return rej("请先登录");
        }
        options.header.token = token;
      }
      common_vendor.index.request({
        ...options,
        success: (result) => {
          if (options.native) {
            return res(result);
          }
          if (result.statusCode !== 200) {
            if (options.toast !== false) {
              common_vendor.index.showToast({
                title: result.data.data || "服务端失败",
                icon: "none"
              });
            }
            if (result.data.data === "Token 令牌不合法!")
              ;
            return rej(result.data);
          }
          let data = result.data.data;
          res(data);
        },
        fail: (error) => {
          common_vendor.index.showToast({
            title: error.errMsg || "请求失败",
            icon: "none"
          });
          return rej(error);
        }
      });
    });
  },
  // get请求
  get(url, options = {}) {
    options.url = url;
    options.data = {};
    options.method = "GET";
    return this.request(options);
  },
  // post请求
  post(url, data = {}, options = {}) {
    options.url = url;
    options.data = data;
    options.method = "POST";
    return this.request(options);
  },
  // delete请求
  del(url, data = {}, options = {}) {
    options.url = url;
    options.data = data;
    options.method = "DELETE";
    return this.request(options);
  },
  // 上传文件
  upload(url, data, onProgress = false) {
    return new Promise((result, reject) => {
      let token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
      }
      const uploadTask = common_vendor.index.uploadFile({
        url: this.common.baseUrl + url,
        filePath: data.filePath,
        name: data.name || "files",
        header: {
          token
        },
        formData: data.formData || {},
        success: (res) => {
          if (res.statusCode !== 200) {
            result(false);
            return common_vendor.index.showToast({
              title: "上传失败",
              icon: "none"
            });
          }
          let message = JSON.parse(res.data);
          result(message.data);
        },
        fail: (err) => {
          console.log(err);
          reject(err);
        }
      });
      uploadTask.onProgressUpdate((res) => {
        if (typeof onProgress === "function") {
          onProgress(res.progress);
        }
      });
    });
  }
};
exports.$H = $H;
