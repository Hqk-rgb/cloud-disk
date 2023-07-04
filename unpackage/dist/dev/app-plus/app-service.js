if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$b = {
    name: "UniStatusBar",
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight + "px"
      };
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ height: $data.statusBarHeight }),
        class: "uni-status-bar bg-main"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$4], ["__scopeId", "data-v-2ac0d4a5"], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-status-bar/uni-status-bar.vue"]]);
  const _sfc_main$a = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_status_bar = resolveEasycom(vue.resolveDynamicComponent("uni-status-bar"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "fixed-top bg-main" }, [
        vue.createVNode(_component_uni_status_bar),
        vue.createElementVNode("view", {
          style: { "height": "44px" },
          class: "flex border-bottom align-center"
        }, [
          vue.createElementVNode("view", { class: "flex-1 flex" }, [
            vue.createCommentVNode(" 具名插槽 "),
            vue.renderSlot(_ctx.$slots, "left")
          ]),
          vue.createElementVNode("view", { class: "flex-1 flex justify-center" }, [
            vue.createCommentVNode(" 默认插槽 "),
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          vue.createElementVNode("view", { class: "flex-1 flex justify-end" }, [
            vue.createCommentVNode(" 具名插槽 "),
            vue.renderSlot(_ctx.$slots, "right")
          ])
        ])
      ]),
      vue.createCommentVNode(" 占位 "),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uni_status_bar),
        vue.createElementVNode("view", { style: { "height": "44px" } })
      ])
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$3], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const _sfc_main$9 = {
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
      const icons = vue.reactive({
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
      const iconClass = vue.computed(() => {
        let item = icons[props.item.type];
        return `${item.icon} ${item.color}`;
      });
      const onSelect = () => {
        emits("my-select");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 左中右三部分 "),
            vue.createElementVNode("view", {
              class: "p-3 flex align-center border bottom-border",
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click"))
            }, [
              vue.createCommentVNode(" 左侧：用计算属性得出动态样式，显示不同类型的文件图标 "),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["iconfont", vue.unref(iconClass)]),
                  style: { "font-size": "60rpx" }
                },
                null,
                2
                /* CLASS */
              ),
              vue.createCommentVNode(" 中间：渲染由父组件传入的对象中的名称和时间属性 "),
              vue.createElementVNode("view", {
                class: "flex flex-column ml-3",
                style: { "line-height": "1.2" }
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "font-md" },
                  vue.toDisplayString(props.item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "font-sm text-muted mt-2" },
                  vue.toDisplayString(props.item.create_time),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 右侧:根据传入的对象中的checked属性，进行条件渲染 "),
              props.showRight ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "ml-auto"
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createElementVNode("view", {
                    class: "flex align-center justify-center",
                    style: { "width": "70rpx", "height": "70rpx" },
                    onClick: vue.withModifiers(onSelect, ["stop"])
                  }, [
                    vue.createCommentVNode(" 未选中，画一个灰色的圆圈 "),
                    !props.item.checked ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      style: { "width": "25rpx", "height": "25rpx" },
                      class: "rounded-circle border"
                    })) : (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 1 },
                      [
                        vue.createCommentVNode(" 选中，用字体图标 "),
                        vue.createElementVNode("text", {
                          class: "iconfont icon-xuanze-yixuan text-primary",
                          style: { "font-size": "25px" }
                        })
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
                  ], 8, ["onClick"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" bottom具名插槽 "),
              vue.renderSlot(_ctx.$slots, "bottom"),
              vue.createCommentVNode(' <view class="ml-auto flex align-center justify-center" @click.stop="onSelect"> '),
              vue.createCommentVNode(" 未选中，画一个灰色的圆圈 "),
              vue.createCommentVNode(' <text v-if="!props.item.checked" style="width:30rpx;height: 30rpx;border: 1px soild #999;"\r\n				class="rounded-circle"></text> '),
              vue.createCommentVNode(" 选中，用字体图标 "),
              vue.createCommentVNode(' <text v-else class="iconfont icon-xuanze-yixuan text-primary" style="font-size: 20px;"></text>\r\n		</view> ')
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "D:/code/202309/uniapp/cloud-disk-app/components/f-list/f-list.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$8 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$2], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$7 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at components/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$1], ["__scopeId", "data-v-c9f9675a"], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$6 = {
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
      const popRef = vue.ref(null);
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
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 在提供的uni-popup组件基础上，封装自定义全局弹出层"),
            vue.createVNode(
              _component_uni_popup,
              {
                ref_key: "popRef",
                ref: popRef
              },
              {
                default: vue.withCtx(() => [
                  vue.createCommentVNode(" 弹出层最外层容器样式 "),
                  vue.createElementVNode("view", {
                    style: { "width": "600rpx" },
                    class: "bg-white rounded"
                  }, [
                    vue.createCommentVNode(" 弹出层标题样式，标题内容通过父组件传进来 "),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "flex align-center justify-center font-weight-bold border-bottom border-light-secondary",
                        style: { "height": "100rpx" }
                      },
                      vue.toDisplayString(props.title),
                      1
                      /* TEXT */
                    ),
                    vue.createCommentVNode(" 弹出层的内容，通过插槽分发，这样就可以在父组件中指定各种内容 "),
                    vue.createElementVNode("view", { class: "flex align-center justify-center p-3" }, [
                      vue.renderSlot(_ctx.$slots, "default")
                    ]),
                    vue.createCommentVNode(" 确定和取消区域，用@tap事件更适合手机端的操作，显示的文字可以通过组件定义的属性进行传递 "),
                    vue.createElementVNode("view", {
                      class: "flex border-top border-light-secondary",
                      style: { "height": "100rpx" }
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "text-muted align-center flex-1 flex justify-center",
                          onClick: cancel
                        },
                        vue.toDisplayString(props.cancelText),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        {
                          class: "flex-1 text-main flex align-center justify-center",
                          onClick: confirm
                        },
                        vue.toDisplayString(props.confirmText),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                _: 3
                /* FORWARDED */
              },
              512
              /* NEED_PATCH */
            )
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "D:/code/202309/uniapp/cloud-disk-app/components/f-dialog/f-dialog.vue"]]);
  const _sfc_main$5 = {
    __name: "index",
    setup(__props) {
      const list = vue.ref([{
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
        formatAppLog("log", "at pages/index/index.vue:166", list.value[index].checked);
      };
      const checkedList = vue.computed(() => {
        return list.value.filter((item) => item.checked);
      });
      const handleCheckAll = (checked) => {
        list.value.forEach((item) => {
          item.checked = checked;
        });
      };
      const actions = vue.computed(() => {
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
      const deleteDialogRef = vue.ref(null);
      const renameDialogRef = vue.ref(null);
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
        uni.showToast({
          title: "删除成功",
          icon: "success"
        });
      };
      const handleCancel = () => {
        formatAppLog("log", "at pages/index/index.vue:243", "取消");
      };
      const renameValue = vue.ref("");
      const handleRenameConfirm = () => {
        if (renameValue.value === "") {
          return uni.showToast({
            title: "文件名不能为空",
            icon: "none"
          });
        }
        checkedList.value[0].name = renameValue.value;
        renameDialogRef.value.hidePopup();
      };
      const addList = vue.ref([{
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
      const addPopup = vue.ref(null);
      const openAddPopup = () => {
        addPopup.value.open();
      };
      const newDirDialogRef = vue.ref(null);
      const newDirName = vue.ref("");
      const handleAddEvent = (item) => {
        addPopup.value.close();
        switch (item.name) {
          case "新建文件夹":
            newDirDialogRef.value.showPopup();
        }
      };
      const handleNewDirConfirm = () => {
        if (newDirName.value === "") {
          return uni.showToast({
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
        uni.showToast({
          title: "新建文件夹成功",
          icon: "none"
        });
        newDirDialogRef.value.hidePopup();
      };
      const doEvent = (item) => {
        formatAppLog("log", "at pages/index/index.vue:321", item);
        switch (item.type) {
          case "image":
            let images = list.value.filter((item2) => {
              return item2.type === "image";
            });
            uni.previewImage({
              current: item.url,
              urls: images.map((item2) => item2.url)
            });
            break;
          case "video":
            uni.navigateTo({
              url: "../video/video?url=" + item.data + "&title=" + item.name
            });
            break;
        }
      };
      const sortIndex = vue.ref(0);
      const sortOptions = vue.ref([{
        name: "按名称排序"
      }, {
        name: "按时间排序"
      }]);
      const sortPopup = vue.ref(null);
      const openSortPopup = () => {
        sortPopup.value.open();
      };
      const changeSort = (index) => {
        sortIndex.value = index;
        sortPopup.value.close();
      };
      return (_ctx, _cache) => {
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$2);
        const _component_f_list = resolveEasycom(vue.resolveDynamicComponent("f-list"), __easycom_0$1);
        const _component_f_dialog = resolveEasycom(vue.resolveDynamicComponent("f-dialog"), __easycom_2);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createCommentVNode(" 选中个数为0 "),
          vue.unref(checkedList).length === 0 ? (vue.openBlock(), vue.createBlock(_component_uni_nav_bar, { key: 0 }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "ml-3 text-light font-md" }, "首页")
            ]),
            right: vue.withCtx(() => [
              vue.createElementVNode("view", {
                style: { "width": "60rpx", "height": "60rpx" },
                class: "flex align-center justify-center bg-light rounded-circle mr-3",
                onClick: openAddPopup
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-zengjia" })
              ]),
              vue.createElementVNode("view", {
                style: { "width": "60rpx", "height": "60rpx" },
                class: "flex align-center justify-center bg-light rounded-circle mr-3",
                onClick: openSortPopup
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-gengduo" })
              ])
            ]),
            _: 1
            /* STABLE */
          })) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 选中个数不为0 "),
              vue.createVNode(_component_uni_nav_bar, null, {
                left: vue.withCtx(() => [
                  vue.createElementVNode("text", {
                    class: "font-md ml-3 text-light",
                    onClick: _cache[0] || (_cache[0] = ($event) => handleCheckAll(false))
                  }, "取消")
                ]),
                right: vue.withCtx(() => [
                  vue.createElementVNode("text", {
                    class: "font-md mr-3 text-light",
                    onClick: _cache[1] || (_cache[1] = ($event) => handleCheckAll(true))
                  }, "全选")
                ]),
                default: vue.withCtx(() => [
                  vue.createElementVNode(
                    "text",
                    { class: "font-md text-light font-weight-bold" },
                    "已选中 " + vue.toDisplayString(vue.unref(checkedList).length) + " 个",
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )),
          vue.createCommentVNode(" 搜索框 "),
          vue.createElementVNode("view", { class: "px-3 py-2" }, [
            vue.createCommentVNode(" 父相子绝 "),
            vue.createElementVNode("view", { class: "position-relative" }, [
              vue.createCommentVNode(" 搜索图标绝对定位到父容器左侧 "),
              vue.createElementVNode("view", {
                style: { "height": "70rpx", "width": "70rpx", "position": "absolute", "top": "0", "left": "0" },
                class: "flex align-center justify-center text-light-muted"
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-sousuo" })
              ]),
              vue.createCommentVNode(" 输入框左侧留出空位，正好放置搜索图标 "),
              vue.createElementVNode("input", {
                type: "text",
                style: { "height": "70rpx", "padding-left": "70rpx" },
                class: "bg-white font-md rounded-circle",
                placeholder: "搜索文件"
              })
            ])
          ]),
          vue.createCommentVNode(" 自定义列表组件 "),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(list.value, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_f_list, {
                key: index,
                item,
                index,
                onClick: ($event) => doEvent(item),
                onMySelect: ($event) => handleSelect(index)
              }, null, 8, ["item", "index", "onClick", "onMySelect"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createCommentVNode(" 底部操作条 "),
          vue.createCommentVNode(" 选中元素大于0，才会出现操作条 "),
          vue.unref(checkedList).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
            vue.createCommentVNode(" 设置操作条容器样式：高度、颜色。。。 "),
            vue.createElementVNode("view", {
              style: { "height": "115rpx" },
              class: "flex align-stretch bg-main text-white fixed-bottom"
            }, [
              vue.createCommentVNode(" 根据操作元素个数等分容器 "),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(actions), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "flex-1 flex flex-column align-center justify-center",
                    style: { "line-height": "1.5" },
                    key: index,
                    "hover-class": "bg-hover-primary",
                    onClick: ($event) => handleBottomEvent(item)
                  }, [
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass(["iconfont", item.icon])
                      },
                      null,
                      2
                      /* CLASS */
                    ),
                    vue.createTextVNode(
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 删除对话框 "),
          vue.createVNode(
            _component_f_dialog,
            {
              ref_key: "deleteDialogRef",
              ref: deleteDialogRef,
              onConfirm: handleDeleteConfirm,
              onCancel: handleCancel
            },
            {
              default: vue.withCtx(() => [
                vue.createTextVNode("是否删除选中的文件")
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createCommentVNode(" 重命名对话框 "),
          vue.createVNode(
            _component_f_dialog,
            {
              ref_key: "renameDialogRef",
              ref: renameDialogRef,
              onConfirm: handleRenameConfirm,
              onCancel: handleCancel
            },
            {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => renameValue.value = $event),
                    class: "flex-1 bg-light rounded px-2",
                    style: { "height": "95rpx" },
                    placeholder: "重命名"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, renameValue.value]
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createCommentVNode(" 添加操作条， type表示弹出层位置 "),
          vue.createVNode(
            _component_uni_popup,
            {
              ref_key: "addPopup",
              ref: addPopup,
              type: "bottom"
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "bg-white flex",
                  style: { "height": "200rpx" }
                }, [
                  vue.createCommentVNode(" 遍历addList数组，纵向flex布局 "),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(addList.value, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "flex-1 flex align-center justify-center flex-column",
                        "hover-class": "bg-light",
                        key: index,
                        onClick: ($event) => handleAddEvent(item)
                      }, [
                        vue.createCommentVNode(" 每个操作的图标，可以传入图标的名称和颜色 "),
                        vue.createElementVNode(
                          "text",
                          {
                            style: { "width": "110rpx", "height": "110rpx" },
                            class: vue.normalizeClass(["flex align-center justify-center rounded-circle bg-light iconfont", item.icon + " " + item.color])
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        vue.createCommentVNode(" 每个操作的名称 "),
                        vue.createElementVNode(
                          "text",
                          { class: "font text-muted" },
                          vue.toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createCommentVNode(" 新建文件夹对话框 "),
          vue.createVNode(
            _component_f_dialog,
            {
              ref_key: "newDirDialogRef",
              ref: newDirDialogRef,
              onConfirm: handleNewDirConfirm,
              onCancel: handleCancel
            },
            {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => newDirName.value = $event),
                    class: "flex-1 bg-light rounded px-2",
                    style: { "height": "95rpx" },
                    placeholder: "新建文件夹名称"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, newDirName.value]
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createCommentVNode(" 文件排序对话框，由底部弹出，遍历排序操作数组 "),
          vue.createVNode(
            _component_uni_popup,
            {
              ref_key: "sortPopup",
              ref: sortPopup,
              type: "bottom"
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "bg-white" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(sortOptions.value, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: index,
                        class: vue.normalizeClass(["flex align-center justify-center py-3 border-bottom border-light-secondary", index === sortIndex.value ? "text-main" : "text-dark"]),
                        "hover-class": "bg-light",
                        onClick: ($event) => changeSort(index)
                      }, vue.toDisplayString(item.name), 11, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/index/index.vue"]]);
  const _sfc_main$4 = {
    __name: "list",
    setup(__props) {
      const tabIndex = vue.ref(0);
      const tabBars = vue.ref([{
        name: "下载列表"
      }, {
        name: "上传列表"
      }]);
      const changeTab = (index) => {
        tabIndex.value = index;
      };
      const list = vue.ref([{
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
      const downloading = vue.computed(() => {
        return list.value.filter((item) => {
          return item.download < 100;
        });
      });
      const downloaded = vue.computed(() => {
        return list.value.filter((item) => {
          return item.download === 100;
        });
      });
      const swiperChange = (e) => {
        const index = e.detail.current;
        formatAppLog("log", "at pages/list/list.vue:66", index);
        tabIndex.value = index;
      };
      return (_ctx, _cache) => {
        const _component_f_list = resolveEasycom(vue.resolveDynamicComponent("f-list"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", {
          style: { "height": "100vh" },
          class: "flex flex-column"
        }, [
          vue.createElementVNode("view", {
            class: "flex border-bottom border-light-secondary",
            style: { "height": "100rpx" }
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(tabBars.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["flex-1 flex flex-column align-center justify-center", index === tabIndex.value ? "text-main" : ""]),
                  key: index,
                  onClick: ($event) => changeTab(index)
                }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    {
                      style: { "height": "8rpx", "width": "140rpx" },
                      class: vue.normalizeClass(["rounded", tabIndex.value === index ? "bg-main" : "bg-white"])
                    },
                    null,
                    2
                    /* CLASS */
                  )
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("swiper", {
            duration: 250,
            class: "flex-1 flex",
            current: tabIndex.value,
            onChange: swiperChange
          }, [
            vue.createCommentVNode(" 下载列表 "),
            vue.createElementVNode("swiper-item", { class: "flex-1 flex" }, [
              vue.createElementVNode("scroll-view", {
                "scroll-y": "true",
                class: "flex-1"
              }, [
                vue.createElementVNode("view", {
                  style: { "height": "60rpx" },
                  class: "bg-light flex align-center font-sm px-2 text-muted"
                }, " 文件下载至： storage/xxxx/xxxx "),
                vue.createElementVNode(
                  "view",
                  { class: "p-2 border-bottom border-light-secondary font text-muted" },
                  " 下载中（" + vue.toDisplayString(vue.unref(downloading).length) + ") ",
                  1
                  /* TEXT */
                ),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(downloading), (item, index) => {
                    return vue.openBlock(), vue.createBlock(_component_f_list, {
                      key: "i" + index,
                      item,
                      index
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", {
                          style: { "height": "70rpx" },
                          class: "flex align-center text-main"
                        }, [
                          vue.createElementVNode("text", { class: "iconfont icon-zanting" }),
                          vue.createElementVNode(
                            "text",
                            { class: "ml-1" },
                            vue.toDisplayString(item.download),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("progress", {
                          slot: "bottom",
                          percent: item.download,
                          activeColor: "#009CFF",
                          "stroke-width": 4,
                          style: { "width": "100rpx" }
                        }, null, 8, ["percent"])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["item", "index"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createElementVNode(
                  "view",
                  { class: "p-2 border-bottom border-light-secondary font text-muted" },
                  " 下载完成（" + vue.toDisplayString(vue.unref(downloaded).length) + "） ",
                  1
                  /* TEXT */
                ),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(downloaded), (item, index) => {
                    return vue.openBlock(), vue.createBlock(_component_f_list, {
                      key: "d" + index,
                      index,
                      item,
                      showRight: false
                    }, null, 8, ["index", "item"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createCommentVNode(" 上传列表 "),
            vue.createElementVNode("swiper-item", null, [
              vue.createElementVNode("scroll-view", {
                "scroll-y": "true",
                class: "flex-1"
              }, [
                vue.createElementVNode("view", { class: "font-md" }, " 上传列表")
              ])
            ])
          ], 40, ["current"])
        ]);
      };
    }
  };
  const PagesListList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/list/list.vue"]]);
  const _sfc_main$3 = {
    __name: "my",
    setup(__props) {
      const logout = () => {
        uni.navigateTo({
          url: "../login/login"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "p-3 flex align-center" }, [
            vue.createElementVNode("image", {
              src: "https://s1.ax1x.com/2023/03/25/ppDEXBq.png",
              style: { "width": "180rpx", "height": "180rpx", "border-radius": "50%" }
            }),
            vue.createElementVNode("view", { class: "flex-1 flex flex-column text-muted font" }, [
              vue.createElementVNode("view", { class: "flex align-end" }, [
                vue.createElementVNode("text", { class: "font-md text-dark ml-3" }, "王瀚锋")
              ]),
              vue.createElementVNode("text", { class: "pr-2 ml-3" }, "软件工程师")
            ])
          ]),
          vue.createElementVNode("view", {
            class: "bg-light",
            style: { "height": "20rpx" }
          }),
          vue.createElementVNode("view", { class: "p-3" }, [
            vue.createElementVNode("progress", {
              class: "mb-2",
              percent: "20",
              active: "",
              "stroke-width": "5"
            }),
            vue.createElementVNode("view", { class: "flex align-center justify-between font" }, [
              vue.createElementVNode("text", { class: "text-light-muted" }, "总量：500GB"),
              vue.createElementVNode("text", { class: "text-warning" }, "已用：100GB")
            ])
          ]),
          vue.createElementVNode("view", {
            class: "bg-light",
            style: { "height": "20rpx" }
          }),
          vue.createElementVNode("view", { class: "flex justify-between p-3" }, [
            vue.createElementVNode("text", { class: "text-muted font" }, "设置"),
            vue.createElementVNode("image", {
              src: "/static/arrow-right.png",
              mode: "",
              style: { "width": "40rpx", "height": "40rpx" }
            })
          ]),
          vue.createElementVNode("view", {
            class: "bg-main text-white flex align-center justify-center font-md py-1 mx-2 rounded-circle",
            "hover-class": "bg-main-hover",
            onClick: logout
          }, "退出登录")
        ]);
      };
    }
  };
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/my/my.vue"]]);
  const _sfc_main$2 = {
    __name: "video",
    setup(__props) {
      const url = vue.ref("");
      onLoad((e) => {
        if (!e.url) {
          uni.showToast({
            title: "视频地址非法",
            icon: "none"
          });
          return uni.navigateBack({
            delta: 1
          });
        }
        url.value = e.url;
        if (e.title) {
          uni.setNavigationBarTitle({
            title: e.title
          });
        }
      });
      const back = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { style: { "height": "100vh" } }, [
          vue.createCommentVNode(" 全屏自动播放视频 "),
          vue.createElementVNode("video", {
            src: url.value,
            controls: "",
            autoplay: "",
            style: { "width": "750rpx", "height": "100vh" },
            onEnded: back
          }, null, 40, ["src"])
        ]);
      };
    }
  };
  const PagesVideoVideo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/video/video.vue"]]);
  vue.ref("login");
  vue.ref({
    username: "",
    password: "",
    repassword: ""
  });
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      style: { "height": "100vh" },
      class: "bg-light"
    }, [
      vue.createElementVNode("view", { style: { "height": "44px" } }),
      vue.createElementVNode("view", {
        class: "flex align-center justify-center font-lg text-muted",
        style: { "margin-top": "100rpx", "margin-bottom": "100rpx" }
      }, "千度云盘"),
      vue.createElementVNode("view", { class: "px-4" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.username = $event),
            class: "uni-input bg-white rounded mb-4 text-muted",
            placeholder: "手机号/用户名"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, _ctx.username]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.password = $event),
            class: "uni-input bg-white rounded mb-4 text-muted",
            placeholder: "请输入密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, _ctx.password]
        ]),
        vue.createCommentVNode(" 如果是注册，才显示确认密码框 "),
        _ctx.type === "reg" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
          "input",
          {
            key: 0,
            type: "text",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.repassword = $event),
            class: "uni-input bg-white rounded mb-4",
            placeholder: "请输入确认密码"
          },
          null,
          512
          /* NEED_PATCH */
        )), [
          [vue.vModelText, _ctx.repassword]
        ]) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: "bg-main text-white flex align-center justify-center font-md py-2 rounded-circle",
            "hover-class": "bg-main-hover",
            onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
          },
          vue.toDisplayString(_ctx.type === "login" ? "登录" : "注册"),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "flex align-center justify-center pt-5" }, [
        vue.createElementVNode(
          "view",
          {
            class: "text-main mx-2 font-sm",
            onClick: _cache[4] || (_cache[4] = (...args) => _ctx.changeType && _ctx.changeType(...args))
          },
          vue.toDisplayString(_ctx.type === "login" ? "去注册" : "去登录"),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/login/login.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/list/list", PagesListList);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/video/video", PagesVideoVideo);
  __definePage("pages/login/login", PagesLoginLogin);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
