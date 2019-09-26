<template>
  <!-- 标题栏 -->
  <!-- 显示隐藏过渡动画 -->
  <transition name="down">
    <div class="title-wrapper" v-show="titleAndMenuShow">
      <div class="left">
        <span class="iconfont icon">&#xe614;</span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="iconfont icon">&#xe604;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon">&#xe63a;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon">&#xe67c;</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    titleAndMenuShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/styles/global";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    flex: 0 0 px2rem(60);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(60);
    }
  }
  // & 表示同级目录下
}
</style>