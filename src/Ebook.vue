<template>
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read"></div>
      <!-- 浮层 -->
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Epub from "epubjs";
const DOWNLOAD_URL = "/static/2019_Book_TheEverydayLifeOfAnAlgorithm (1).epub"; //指向电子书的下载路径
global.epub = Epub;

export default {
  methods: {
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