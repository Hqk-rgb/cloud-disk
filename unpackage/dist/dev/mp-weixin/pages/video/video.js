"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "video",
  setup(__props) {
    const url = common_vendor.ref("");
    common_vendor.onLoad((e) => {
      if (!e.url) {
        common_vendor.index.showToast({
          title: "视频地址非法",
          icon: "none"
        });
        return common_vendor.index.navigateBack({
          delta: 1
        });
      }
      url.value = e.url;
      if (e.title) {
        common_vendor.index.setNavigationBarTitle({
          title: e.title
        });
      }
    });
    const back = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return {
        a: url.value,
        b: common_vendor.o(back)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/video/video.vue"]]);
wx.createPage(MiniProgramPage);
