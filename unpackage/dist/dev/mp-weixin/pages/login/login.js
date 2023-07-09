"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const type = common_vendor.ref("login");
    const form = common_vendor.ref({
      username: "otter",
      password: "123456",
      repassword: "123456"
    });
    const changeType = () => {
      type.value = type.value === "login" ? "reg" : "login";
    };
    const handleClick = () => {
      let msg = type.value === "login" ? "登录" : "注册";
      common_request.$H.post("/" + type.value, form.value).then((res) => {
        common_vendor.index.showToast({
          title: msg + "成功",
          icon: "success",
          duration: 1e3
        });
        if (type.value === "login") {
          store_index.store.dispatch("login", res).then((res2) => {
            common_vendor.index.switchTab({
              url: "../index/index"
            });
          });
        } else {
          form.value = {
            username: "ssssss",
            password: "123456",
            repassword: "123456"
          };
          changeType();
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.value.username,
        b: common_vendor.o(($event) => form.value.username = $event.detail.value),
        c: form.value.password,
        d: common_vendor.o(($event) => form.value.password = $event.detail.value),
        e: type.value === "reg"
      }, type.value === "reg" ? {
        f: form.value.repassword,
        g: common_vendor.o(($event) => form.value.repassword = $event.detail.value)
      } : {}, {
        h: common_vendor.t(type.value === "login" ? "登录" : "注册"),
        i: common_vendor.o(handleClick),
        j: common_vendor.t(type.value === "login" ? "去注册" : "去登录"),
        k: common_vendor.o(changeType)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
