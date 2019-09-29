<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div
          class="content-item"
          @click="jumpTo(item.href)"
          v-for="(item,index) in navigation.toc"
          :key="index"
        >
          <span class="text">{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中...</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ifShowContent: Boolean,
    navigation: Object,
    bookAvailable: Boolean
  },
  methods: {
    jumpTo(target) {
      this.$emit("jumpTo", target);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";
.content {
  position: absolute;
  top: 0;
  font-size: 14px;
  line-height: 50px;
  z-index: 103;
  background: #fff;
  width: 80%;
  height: 100%;
  padding-left: 20px;
  cursor: pointer;
}
</style>