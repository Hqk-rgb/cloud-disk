"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "f-list",
  props: {
    item: Object,
    index: [Number, String],
    showRight: {
      type: Boolean,
      default: true
    },
    checked: Boolean
  },
  emits: ["my-select"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const icons = common_vendor.reactive({
      dir: {
        icon: "icon-file-b-2",
        color: "text-warning"
      },
      image: {
        icon: "icon-file-b-6",
        color: "text-success"
      },
      video: {
        icon: "icon-file-b-9",
        color: "text-primary"
      },
      text: {
        icon: "icon-file-s-7",
        color: "text-info"
      },
      none: {
        icon: "icon-file-b-8",
        color: "text-muted"
      }
    });
    const iconClass = common_vendor.computed(() => {
      let item = icons[props.item.type];
      return `${item.icon} ${item.color}`;
    });
    const onSelect = () => {
      emits("my-select");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(iconClass)),
        b: common_vendor.t(props.item.name),
        c: common_vendor.t(props.item.create_time),
        d: props.showRight
      }, props.showRight ? common_vendor.e({
        e: !props.item.checked
      }, !props.item.checked ? {} : {}, {
        f: common_vendor.o(onSelect)
      }) : {}, {
        g: common_vendor.o(($event) => emits("click"))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/components/f-list/f-list.vue"]]);
wx.createComponent(Component);
