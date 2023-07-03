"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_f_list2 = common_vendor.resolveComponent("f-list");
  const _easycom_f_dialog2 = common_vendor.resolveComponent("f-dialog");
  (_easycom_uni_nav_bar2 + _easycom_f_list2 + _easycom_f_dialog2)();
}
const _easycom_uni_nav_bar = () => "../../components/uni-nav-bar/uni-nav-bar.js";
const _easycom_f_list = () => "../../components/f-list/f-list.js";
const _easycom_f_dialog = () => "../../components/f-dialog/f-dialog.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_f_list + _easycom_f_dialog)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const list = common_vendor.ref([{
      type: "dir",
      name: "盗墓笔记",
      create_time: "2023-07-01 08:01",
      checked: true
    }, {
      type: "image",
      name: "闷油瓶.jpg",
      create_time: "2023-07-01 09:01",
      checked: true
    }, {
      type: "video",
      name: "云顶天宫.mp4",
      create_time: "2023-07-01 10:01",
      checked: true
    }, {
      type: "text",
      name: "三爷日记.txt",
      create_time: "2023-07-01 11:01",
      checked: false
    }, {
      type: "none",
      name: "邛楼石影.rar",
      create_time: "2023-07-01 12:01",
      checked: false
    }]);
    const handleSelect = (index) => {
      list.value[index].checked = !list.value[index].checked;
      console.log(list.value[index].checked);
    };
    const checkedList = common_vendor.computed(() => {
      return list.value.filter((item) => item.checked);
    });
    const handleCheckAll = (checked) => {
      list.value.forEach((item) => {
        item.checked = checked;
      });
    };
    const actions = common_vendor.computed(() => {
      if (checkedList.value.length > 1) {
        return [{
          icon: "icon-xiazai",
          name: "下载"
        }, {
          icon: "icon-shanchu",
          name: "删除"
        }];
      }
      return [
        {
          icon: "icon-xiazai",
          name: "下载"
        },
        {
          icon: "icon-fenxiang-1",
          name: "分享"
        },
        {
          icon: "icon-shanchu",
          name: "删除"
        },
        {
          icon: "icon-chongmingming",
          name: "重命名"
        }
      ];
    });
    const deleteDialogRef = common_vendor.ref(null);
    const handleBottomEvent = (item) => {
      switch (item.name) {
        case "删除":
          deleteDialogRef.value.showPopup();
          break;
      }
    };
    const handleDeleteConfirm = () => {
      list.value = list.value.filter((item) => !item.checked);
      common_vendor.index.showToast({
        title: "删除成功",
        icon: "success"
      });
    };
    const handleCancel = () => {
      console.log("取消");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(checkedList).length === 0
      }, common_vendor.unref(checkedList).length === 0 ? {} : {
        b: common_vendor.o(($event) => handleCheckAll(false)),
        c: common_vendor.t(common_vendor.unref(checkedList).length),
        d: common_vendor.o(($event) => handleCheckAll(true))
      }, {
        e: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => handleSelect(index), index),
            c: "682ffb32-2-" + i0,
            d: common_vendor.p({
              item,
              index
            })
          };
        }),
        f: common_vendor.unref(checkedList).length > 0
      }, common_vendor.unref(checkedList).length > 0 ? {
        g: common_vendor.f(common_vendor.unref(actions), (item, index, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => handleBottomEvent(item), index)
          };
        })
      } : {}, {
        h: common_vendor.sr(deleteDialogRef, "682ffb32-3", {
          "k": "deleteDialogRef"
        }),
        i: common_vendor.p({
          onConfirm: handleDeleteConfirm,
          onCancel: handleCancel
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
