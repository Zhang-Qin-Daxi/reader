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
      @jumpTo="jumpTo"
      :navigation="navigation"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
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
      //所有字号
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16, //默认字号
      // 创建主题数组
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "green"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgb(241,236,226)"
            }
          }
        }
      ],
      defaultTheme: 0,
      //图书是否处于可用状态
      bookAvailable: false,
      navigation:{}
    };
  },
  methods: {
    //根据链接跳转到指定位置
    jumpTo(href) {
      this.rendition.display(href);
      this.hideTitleAndMenuShow();
    },
    hideTitleAndMenuShow() {
      //隐藏标题栏和菜单栏
      this.titleAndMenuShow = false
      //隐藏菜单栏弹出的设置
      this.$refs.menuBar.fontSizeClick()
      //隐藏目录
      this.$refs.menuBar.hideContent()
    },
    //progress进度条的数值(0-100)
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },

    //主题
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },

    //设置字体大小
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
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
      //将主题注册到themes对象中
      // this.themes.register(name,styles);
      //通过主题名称快速的切换主题
      // this.themes.select(name);

      this.registerTheme();
      this.setTheme(this.defaultTheme);

      //通过epubjs的钩子函数来表现
      this.book.ready
        .then(() => {
          //获取navigation对象来获取目录
          this.navigation = this.book.navigation;
          console.log(this.navigation,'this.navigation');
          
          //获取Location对象来获取路径
          return this.book.locations.generate();
        })
        .then(result => {
          this.locations = this.book.locations;
          this.bookAvailable = true;
        });
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