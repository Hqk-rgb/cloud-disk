"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.ref("login");
common_vendor.ref({
  username: "",
  password: "",
  repassword: ""
});
const _sfc_main = {};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.username,
    b: common_vendor.o(($event) => _ctx.username = $event.detail.value),
    c: _ctx.password,
    d: common_vendor.o(($event) => _ctx.password = $event.detail.value),
    e: _ctx.type === "reg"
  }, _ctx.type === "reg" ? {
    f: _ctx.repassword,
    g: common_vendor.o(($event) => _ctx.repassword = $event.detail.value)
  } : {}, {
    h: common_vendor.t(_ctx.type === "login" ? "登录" : "注册"),
    i: common_vendor.o((...args) => _ctx.handleClick && _ctx.handleClick(...args)),
    j: common_vendor.t(_ctx.type === "login" ? "去注册" : "去登录"),
    k: common_vendor.o((...args) => _ctx.changeType && _ctx.changeType(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
