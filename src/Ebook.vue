<template>
  <div class="ebook">
    <title-bar :titleAndMenuShow="titleAndMenuShow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <!-- 浮层(左右分页) -->
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      ref="menuBar"
      @setFontSize="setFontSize"
      :defaultFontSize="defaultFontSize"
      :fontSizeList="fontSizeList"
      :titleAndMenuShow="titleAndMenuShow"
    ></menu-bar>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";

import Epub from "epubjs";
const DOWNLOAD_URL = "/static/2019_Book_TheEverydayLifeOfAnAlgorithm (1).epub"; //指向电子书的下载路径
global.epub = Epub;

export default {
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      titleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16
    };
  },
  methods: {
    //设置字体大小
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px');
      }
    },

    //标题栏菜单栏显示隐藏
    toggleTitleAndMenu() {
      this.titleAndMenuShow = !this.titleAndMenuShow;
      if (!this.titleAndMenuShow) {
        this.$refs.menuBar.hideFontSize();
      }
    },
    //上一页
    prevPage() {
      // rendition.prev
      if (this.rendition) {
        this.rendition.prev();
      }
    },

    //下一页
    nextPage() {
      // rendition.next
      if (this.rendition) {
        this.rendition.next();
      }
    },

    // 电子书的解析和渲染
    showEpub() {
      //生成Book
      this.book = new Epub(DOWNLOAD_URL);
      //生成Rendition,通过Book.renderTo
      /* 传入两个参数。
          1.DOM id 生成的电子书已DOM的形式挂载带id上
          2. function 指定渲染的屏幕的宽高
      */
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      //通过Rendition.display渲染电子书
      this.rendition.display();
      //获取Theme对象
      this.themes = this.rendition.themes;
      //设置默认字体
      this.setFontSize(this.defaultFontSize);
    }
  },
  mounted() {
    this.showEpub();
  }
};
</script> 

<style lang='scss' scoped>
@import "assets/styles/global";

.ebook {
  position: relative;

  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100); //将px转换为rem
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>