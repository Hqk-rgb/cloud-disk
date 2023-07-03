<template>
  <view :style="{ height: statusBarHeight }" class="uni-status-bar bg-main">
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
// .uni-status-bar {
//   height: var(--status-bar-height);
// }
</style>
