<template>
  <!-- 菜单栏 -->
  <div class="menu-bar">
    <!-- 显示隐藏过渡动画 -->
    <transition name="up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow':fontSize || !titleAndMenuShow}"
        v-show="titleAndMenuShow"
      >
        <div class="icon-wrapper">
          <span class="iconfont icon">&#xe774;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon">&#xe600;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon">&#xe67b;</span>
        </div>
        <div class="icon-wrapper" @click="fontSizeClick">
          <span class="iconfont icon">&#xe602;</span>
        </div>
      </div>
    </transition>
    <transition name="up">
      <!-- 字号设置 -->
      <div class="setting-wrapper" v-show="fontSize">
        <div class="setting-font-size">
          <div class="preview preLeft" :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div @click="setFontSize(item.fontSize)" class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview preRight"
            :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize + 'px'}"
          >A</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    titleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number
  },
  data() {
    return {
      fontSize: false
    };
  },
  methods: {
    //设置字号点击事件
    setFontSize(fontSize){
      this.$emit('setFontSize',fontSize)
    },
    fontSizeClick() {
      this.fontSize = true;
    },
    hideFontSize() {
      this.fontSize = false;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/styles/global";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .setting-wrapper {
    position: absolute;
    z-index: 101;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(60);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;

      .preview {
        flex: 0 0 px2rem(40);
        display: flex;
        align-items: center;
      }
      .preLeft {
        text-align: right;
        justify-content: center;
        align-items: right;
      }
      .preRight {
        justify-content: left;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-7);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: #fff;
              border: px2rem(1) solid #ccc;
              display: flex;
              align-items: center;
              justify-content: center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: #000;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>