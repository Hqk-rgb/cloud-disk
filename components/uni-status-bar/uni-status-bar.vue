<template>
  <view :style="{ height: statusBarHeight }" class="uni-status-bar bg-primary">
    <slot />
  </view>
</template>

<script>
export default {
  name: "UniStatusBar",
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight + "px",
    };
  },
};
</script>

<style lang="scss">
.uni-status-bar {
  // height: 20px;
  height: var(--status-bar-height);
}
</style>
