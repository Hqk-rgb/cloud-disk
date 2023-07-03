"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "f-dialog",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onCancel: {
      type: Function,
      default: null
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const popRef = common_vendor.ref(null);
    const showPopup = () => {
      popRef.value.open();
    };
    const hidePopup = () => {
      popRef.value.close();
    };
    const confirm = () => {
      if (typeof props.onConfirm === "function") {
        props.onConfirm();
      }
      hidePopup();
    };
    const cancel = () => {
      if (typeof props.onCancel === "function") {
        props.onCancel();
      }
      hidePopup();
    };
    expose({
      showPopup,
      hidePopup
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.t(props.cancelText),
        c: common_vendor.o(cancel),
        d: common_vendor.t(props.confirmText),
        e: common_vendor.o(confirm),
        f: common_vendor.sr(popRef, "0bcc46de-0", {
          "k": "popRef"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/components/f-dialog/f-dialog.vue"]]);
wx.createComponent(Component);
