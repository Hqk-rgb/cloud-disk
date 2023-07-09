"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_f_list2 = common_vendor.resolveComponent("f-list");
  const _easycom_f_dialog2 = common_vendor.resolveComponent("f-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_nav_bar2 + _easycom_f_list2 + _easycom_f_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_nav_bar = () => "../../components/uni-nav-bar/uni-nav-bar.js";
const _easycom_f_list = () => "../../components/f-list/f-list.js";
const _easycom_f_dialog = () => "../../components/f-dialog/f-dialog.js";
const _easycom_uni_popup = () => "../../components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_f_list + _easycom_f_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:7001/list",
        success: (res) => {
          console.log(res.data);
        }
      });
    });
    const list = common_vendor.ref([{
      type: "dir",
      name: "盗墓笔记",
      create_time: "2023-07-01 08:01",
      checked: false
    }, {
      type: "image",
      name: "闷油瓶.jpg",
      url: "https://s1.ax1x.com/2023/07/04/pCsYo1U.jpg",
      create_time: "2023-07-01 09:01",
      checked: false,
      download: 100
    }, {
      type: "video",
      name: "CG混剪.mp4",
      //data: 'https://niit-soft.oss-cn-hangzhou.aliyuncs.com/video/3-1.mp4',
      data: "https://king-hf-bucket.oss-cn-shanghai.aliyuncs.com/video/cg.mp4",
      create_time: "2023-06-01 10:01",
      checked: false
    }, {
      type: "image",
      name: "壁纸.jpg",
      url: "https://i2.100024.xyz/2023/01/26/3kq106.webp",
      create_time: "2023-07-01 10:01",
      checked: false,
      download: 90
    }, {
      type: "image",
      name: "mqxu.jpg",
      url: "https://s1.ax1x.com/2023/04/03/pphvfu4.jpg",
      create_time: "2023-07-01 10:51",
      checked: true,
      download: 80
    }, {
      type: "text",
      name: "三爷日记.txt",
      create_time: "2023-04-01 11:01",
      checked: false,
      download: 100
    }, {
      type: "none",
      name: "邛楼石影.rar",
      create_time: "2023-07-01 12:01",
      checked: false,
      download: 99
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
    const renameDialogRef = common_vendor.ref(null);
    const handleBottomEvent = (item) => {
      switch (item.name) {
        case "删除":
          deleteDialogRef.value.showPopup();
          break;
        case "重命名":
          renameValue.value = checkedList.value[0].name;
          renameDialogRef.value.showPopup();
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
    const renameValue = common_vendor.ref("");
    const handleRenameConfirm = () => {
      if (renameValue.value === "") {
        return common_vendor.index.showToast({
          title: "文件名不能为空",
          icon: "none"
        });
      }
      checkedList.value[0].name = renameValue.value;
      renameDialogRef.value.hidePopup();
    };
    const addList = common_vendor.ref([{
      icon: "icon-file-b-6",
      color: "text-success",
      name: "上传图片"
    }, {
      icon: "icon-file-b-9",
      color: "text-primary",
      name: "上传视频"
    }, {
      icon: "icon-file-b-8",
      color: "text-muted",
      name: "上传文件"
    }, {
      icon: "icon-file-b-2",
      color: "text-warning",
      name: "新建文件夹"
    }]);
    const addPopup = common_vendor.ref(null);
    const openAddPopup = () => {
      addPopup.value.open();
    };
    const newDirDialogRef = common_vendor.ref(null);
    const newDirName = common_vendor.ref("");
    const handleAddEvent = (item) => {
      addPopup.value.close();
      switch (item.name) {
        case "新建文件夹":
          newDirDialogRef.value.showPopup();
      }
    };
    const handleNewDirConfirm = () => {
      if (newDirName.value === "") {
        return common_vendor.index.showToast({
          title: "文件夹名不能为空",
          icon: "none"
        });
      }
      list.value.push({
        type: "dir",
        name: newDirName.value,
        create_time: "2023-07-02 17:56",
        checked: false
      });
      common_vendor.index.showToast({
        title: "新建文件夹成功",
        icon: "none"
      });
      newDirDialogRef.value.hidePopup();
    };
    const doEvent = (item) => {
      console.log(item);
      switch (item.type) {
        case "image":
          let images = list.value.filter((item2) => {
            return item2.type === "image";
          });
          common_vendor.index.previewImage({
            current: item.url,
            urls: images.map((item2) => item2.url)
          });
          break;
        case "video":
          common_vendor.index.navigateTo({
            url: "../video/video?url=" + item.data + "&title=" + item.name
          });
          break;
      }
    };
    const sortIndex = common_vendor.ref(0);
    const sortOptions = common_vendor.ref([{
      name: "按名称排序"
    }, {
      name: "按时间排序"
    }]);
    const sortPopup = common_vendor.ref(null);
    const openSortPopup = () => {
      sortPopup.value.open();
    };
    const changeSort = (index) => {
      sortIndex.value = index;
      sortPopup.value.close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(checkedList).length === 0
      }, common_vendor.unref(checkedList).length === 0 ? {
        b: common_vendor.o(openAddPopup),
        c: common_vendor.o(openSortPopup)
      } : {
        d: common_vendor.o(($event) => handleCheckAll(false)),
        e: common_vendor.t(common_vendor.unref(checkedList).length),
        f: common_vendor.o(($event) => handleCheckAll(true))
      }, {
        g: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => doEvent(item), index),
            c: common_vendor.o(($event) => handleSelect(index), index),
            d: "682ffb32-2-" + i0,
            e: common_vendor.p({
              item,
              index
            })
          };
        }),
        h: common_vendor.unref(checkedList).length > 0
      }, common_vendor.unref(checkedList).length > 0 ? {
        i: common_vendor.f(common_vendor.unref(actions), (item, index, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => handleBottomEvent(item), index)
          };
        })
      } : {}, {
        j: common_vendor.sr(deleteDialogRef, "682ffb32-3", {
          "k": "deleteDialogRef"
        }),
        k: common_vendor.p({
          onConfirm: handleDeleteConfirm,
          onCancel: handleCancel
        }),
        l: renameValue.value,
        m: common_vendor.o(($event) => renameValue.value = $event.detail.value),
        n: common_vendor.sr(renameDialogRef, "682ffb32-4", {
          "k": "renameDialogRef"
        }),
        o: common_vendor.p({
          onConfirm: handleRenameConfirm,
          onCancel: handleCancel
        }),
        p: common_vendor.f(addList.value, (item, index, i0) => {
          return {
            a: common_vendor.n(item.icon + " " + item.color),
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => handleAddEvent(item), index)
          };
        }),
        q: common_vendor.sr(addPopup, "682ffb32-5", {
          "k": "addPopup"
        }),
        r: common_vendor.p({
          type: "bottom"
        }),
        s: newDirName.value,
        t: common_vendor.o(($event) => newDirName.value = $event.detail.value),
        v: common_vendor.sr(newDirDialogRef, "682ffb32-6", {
          "k": "newDirDialogRef"
        }),
        w: common_vendor.p({
          onConfirm: handleNewDirConfirm,
          onCancel: handleCancel
        }),
        x: common_vendor.f(sortOptions.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.n(index === sortIndex.value ? "text-main" : "text-dark"),
            d: common_vendor.o(($event) => changeSort(index), index)
          };
        }),
        y: common_vendor.sr(sortPopup, "682ffb32-7", {
          "k": "sortPopup"
        }),
        z: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
