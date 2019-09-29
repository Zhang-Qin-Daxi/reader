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
          <span class="iconfont icon" @click="fontSizeClick(3)">&#xe774;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon" @click="fontSizeClick(2)">&#xe600;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont icon" @click="fontSizeClick(1)">&#xe67b;</span>
        </div>
        <div class="icon-wrapper" @click="fontSizeClick(0)">
          <span class="iconfont icon">&#xe602;</span>
        </div>
      </div>
    </transition>
    <transition name="up">
      <div class="setting-wrapper" v-show="fontSize">
        <!-- 字号设置 -->
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview preLeft" :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div
              @click="setFontSize(item.fontSize)"
              class="select-wrapper"
              v-for="(item,index) in fontSizeList"
              :key="index"
            >
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
        <!-- 主题设置 -->
        <div class="setting-theme" v-else-if="showTag === 1">
          <div
            class="setting-theme-item"
            @click="setTheme(index)"
            v-for="(item,index) in themeList"
            :key="index"
          >
            <div
              class="preview"
              :class="{'no-border': item.style.body.background === '#fff'}"
              :style="{background:item.style.body.background}"
            ></div>
            <div class="text" :class="{'selected':index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <!-- 进度条设置 -->
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
            />
            <div class="text-wrapper">
              <span>{{bookAvailable ? progress + '%' : '加载中.......'}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <content-view
      :ifShowContent="ifShowContent"
      v-show="ifShowContent"
      @jumpTo="jumpTo"
      :navigation="navigation"
      :bookAvailable="bookAvailable"
    ></content-view>
    <transition name="fade">
      <div class="content-mask" v-show="ifShowContent" @click="hideContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from "@/components/Content";
export default {
  components: {
    ContentView
  },
  props: {
    titleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    navigation: Object,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: {
      type: Boolean,
      default: false
    },
    defaultFontSize:Number
  },
  data() {
    return {
      fontSize: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false,
    };
  },
  methods: {
    //目录
    hideContent() {
      this.ifShowContent = false;
    },
    jumpTo(target){
      this.$emit('jumpTo',target);
    },
    //拖动进度条时触发
    onProgressInput(progress) {
      this.progress = progress;
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    //进度条松开后触发，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
      this.$emit("onProgressChange", progress);
    },

    //切换主题
    setTheme(index) {
      this.$emit("setTheme", index);
    },
    //设置字号点击事件
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    },
    fontSizeClick(tag) {
      this.showTag = tag;
      if (this.showTag === 3) {
        this.titleAndMenuShow = false;
        this.ifShowContent = true;
        
      } else { 
         this.titleAndMenuShow = true;
      }
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
    cursor: pointer;
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
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          &.no-border {
            border: 1px solid rgb(219, 216, 216);
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &.focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #fff;
            box-sizing: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
            border: px2rem(1) solid #ddd;
          }
        }
        .text-wrapper {
          font-size: 12px;
          margin-left: 15px;
        }
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>