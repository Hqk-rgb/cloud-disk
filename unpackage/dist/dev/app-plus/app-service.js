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
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
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
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$3], ["__scopeId", "data-v-2ac0d4a5"], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-status-bar/uni-status-bar.vue"]]);
  const _sfc_main$a = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$2], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-nav-bar/uni-nav-bar.vue"]]);
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$1], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-transition/uni-transition.vue"]]);
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
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render], ["__scopeId", "data-v-c9f9675a"], ["__file", "D:/code/202309/uniapp/cloud-disk-app/components/uni-popup/uni-popup.vue"]]);
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
      onLoad(() => {
        uni.request({
          url: "http://127.0.0.1:7001/list",
          success: (res) => {
            formatAppLog("log", "at pages/index/index.vue:125", res.data);
          }
        });
      });
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
        formatAppLog("log", "at pages/index/index.vue:178", list.value[index].checked);
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
        formatAppLog("log", "at pages/index/index.vue:255", "取消");
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
        formatAppLog("log", "at pages/index/index.vue:333", item);
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
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store3) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store3.state,
        // root state
        store3.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const store = createStore({
    state: {
      username: "otter",
      user: null,
      token: null
    },
    actions: {
      login({ state }, user) {
        state.user = user;
        state.token = user.token;
        uni.setStorageSync("user", JSON.stringify(user));
        uni.setStorageSync("token", user.token);
      }
    }
  });
  const _sfc_main$3 = {
    __name: "my",
    setup(__props) {
      onShow(() => {
        if (store.state.user !== null) {
          formatAppLog("log", "at pages/my/my.vue:38", store.state.user);
        }
      });
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
  const SH = {
    // 全局配置
    common: {
      baseUrl: "http://127.0.0.1:7001",
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {},
      method: "GET",
      dataType: "json",
      token: false
    },
    // 请求返回promise
    request(options = {}) {
      options.url = this.common.baseUrl + options.url;
      options.header = options.header || this.common.header;
      options.data = options.data || this.common.data;
      options.method = options.method || this.common.method;
      options.dataType = options.dataType || this.common.dataType;
      options.token = options.token === true ? true : this.common.token;
      return new Promise((res, rej) => {
        if (options.token) {
          let token = uni.getStorageSync("token");
          if (!token && options.noJump !== true) {
            uni.showToast({
              title: "请先登录",
              icon: "none"
            });
            uni.navigateTo({
              url: "/pages/login/login"
            });
            return rej("请先登录");
          }
          options.header.token = token;
        }
        uni.request({
          ...options,
          success: (result) => {
            if (options.native) {
              return res(result);
            }
            if (result.statusCode !== 200) {
              if (options.toast !== false) {
                uni.showToast({
                  title: result.data.data || "服务端失败",
                  icon: "none"
                });
              }
              if (result.data.data === "Token 令牌不合法!")
                ;
              return rej(result.data);
            }
            let data = result.data.data;
            res(data);
          },
          fail: (error) => {
            uni.showToast({
              title: error.errMsg || "请求失败",
              icon: "none"
            });
            return rej(error);
          }
        });
      });
    },
    // get请求
    get(url, options = {}) {
      options.url = url;
      options.data = {};
      options.method = "GET";
      return this.request(options);
    },
    // post请求
    post(url, data = {}, options = {}) {
      options.url = url;
      options.data = data;
      options.method = "POST";
      return this.request(options);
    },
    // delete请求
    del(url, data = {}, options = {}) {
      options.url = url;
      options.data = data;
      options.method = "DELETE";
      return this.request(options);
    },
    // 上传文件
    upload(url, data, onProgress = false) {
      return new Promise((result, reject) => {
        let token = uni.getStorageSync("token");
        if (!token) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return uni.reLaunch({
            url: "/pages/login/login"
          });
        }
        const uploadTask = uni.uploadFile({
          url: this.common.baseUrl + url,
          filePath: data.filePath,
          name: data.name || "files",
          header: {
            token
          },
          formData: data.formData || {},
          success: (res) => {
            if (res.statusCode !== 200) {
              result(false);
              return uni.showToast({
                title: "上传失败",
                icon: "none"
              });
            }
            let message = JSON.parse(res.data);
            result(message.data);
          },
          fail: (err) => {
            formatAppLog("log", "at common/request.js:142", err);
            reject(err);
          }
        });
        uploadTask.onProgressUpdate((res) => {
          if (typeof onProgress === "function") {
            onProgress(res.progress);
          }
        });
      });
    }
  };
  const _sfc_main$1 = {
    __name: "login",
    setup(__props) {
      const type = vue.ref("login");
      const form = vue.ref({
        username: "otter",
        password: "123456",
        repassword: "123456"
      });
      const changeType = () => {
        type.value = type.value === "login" ? "reg" : "login";
      };
      const handleClick = () => {
        let msg = type.value === "login" ? "登录" : "注册";
        SH.post("/" + type.value, form.value).then((res) => {
          uni.showToast({
            title: msg + "成功",
            icon: "success",
            duration: 1e3
          });
          if (type.value === "login") {
            store.dispatch("login", res).then((res2) => {
              uni.switchTab({
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
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.value.username = $event),
                class: "uni-input bg-white rounded mb-4 text-muted",
                placeholder: "手机号/用户名"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, form.value.username]
            ]),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "text",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.value.password = $event),
                class: "uni-input bg-white rounded mb-4 text-muted",
                placeholder: "请输入密码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, form.value.password]
            ]),
            vue.createCommentVNode(" 如果是注册，才显示确认密码框 "),
            type.value === "reg" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
              "input",
              {
                key: 0,
                type: "text",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.repassword = $event),
                class: "uni-input bg-white rounded mb-4",
                placeholder: "请输入确认密码"
              },
              null,
              512
              /* NEED_PATCH */
            )), [
              [vue.vModelText, form.value.repassword]
            ]) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: "bg-main text-white flex align-center justify-center font-md py-2 rounded-circle",
                "hover-class": "bg-main-hover",
                onClick: handleClick
              },
              vue.toDisplayString(type.value === "login" ? "登录" : "注册"),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "flex align-center justify-center pt-5" }, [
            vue.createElementVNode(
              "view",
              {
                class: "text-main mx-2 font-sm",
                onClick: changeType
              },
              vue.toDisplayString(type.value === "login" ? "去注册" : "去登录"),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "D:/code/202309/uniapp/cloud-disk-app/pages/login/login.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/list/list", PagesListList);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/video/video", PagesVideoVideo);
  __definePage("pages/login/login", PagesLoginLogin);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:6", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:9", "App Show");
      formatAppLog("log", "at App.vue:10", store.state.username);
      SH.get("./list").then((res) => {
        formatAppLog("log", "at App.vue:12", res);
      });
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:16", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/code/202309/uniapp/cloud-disk-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(store);
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
