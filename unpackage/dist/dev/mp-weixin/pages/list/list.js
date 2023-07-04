"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_f_list2 = common_vendor.resolveComponent("f-list");
  _easycom_f_list2();
}
const _easycom_f_list = () => "../../components/f-list/f-list.js";
if (!Math) {
  _easycom_f_list();
}
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const tabIndex = common_vendor.ref(0);
    const tabBars = common_vendor.ref([{
      name: "下载列表"
    }, {
      name: "上传列表"
    }]);
    const changeTab = (index) => {
      tabIndex.value = index;
    };
    const list = common_vendor.ref([{
      type: "image",
      name: "闷油瓶.jpg",
      url: "https://s1.ax1x.com/2023/07/04/pCsYo1U.jpg",
      create_time: "2023-07-01 09:01",
      checked: false,
      download: 100
    }, {
      type: "image",
      name: "avatar.jpg",
      url: "https://i2.100024.xyz/2023/01/26/3kq106.webp",
      create_time: "2023-07-01 10:01",
      checked: false,
      download: 90
    }, {
      type: "image",
      name: "me.jpg",
      url: "https://s1.ax1x.com/2023/04/03/pphvfu4.jpg",
      create_time: "2023-07-01 10:51",
      checked: true,
      download: 30
    }, {
      type: "text",
      name: "三爷日记.txt",
      create_time: "2023-04-01 11:01",
      checked: false,
      download: 100
    }, {
      type: "none",
      name: "蛇沼鬼城.rar",
      create_time: "2023-07-01 12:01",
      checked: false,
      download: 99
    }]);
    const downloading = common_vendor.computed(() => {
      return list.value.filter((item) => {
        return item.download < 100;
      });
    });
    const downloaded = common_vendor.computed(() => {
      return list.value.filter((item) => {
        return item.download === 100;
      });
    });
    const swiperChange = (e) => {
      const index = e.detail.current;
      console.log(index);
      tabIndex.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabBars.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(tabIndex.value === index ? "bg-main" : "bg-white"),
            c: index,
            d: common_vendor.n(index === tabIndex.value ? "text-main" : ""),
            e: common_vendor.o(($event) => changeTab(index), index)
          };
        }),
        b: common_vendor.t(common_vendor.unref(downloading).length),
        c: common_vendor.f(common_vendor.unref(downloading), (item, index, i0) => {
          return {
            a: common_vendor.t(item.download),
            b: item.download,
            c: "i" + index,
            d: "6f3f44e8-0-" + i0,
            e: common_vendor.p({
              item,
              index
            })
          };
        }),
        d: common_vendor.t(common_vendor.unref(downloaded).length),
        e: common_vendor.f(common_vendor.unref(downloaded), (item, index, i0) => {
          return {
            a: "d" + index,
            b: "6f3f44e8-1-" + i0,
            c: common_vendor.p({
              index,
              item,
              showRight: false
            })
          };
        }),
        f: tabIndex.value,
        g: common_vendor.o(swiperChange)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/list/list.vue"]]);
wx.createPage(MiniProgramPage);
