"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const logout = () => {
      common_vendor.index.navigateTo({
        url: "../login/login"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(logout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
