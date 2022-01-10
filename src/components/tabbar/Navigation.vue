<template>
  <div id="navigation">
    <tab-bar>
      <tab-baritem path="/home">
        <img
          slot="item-icon"
          src="../../assets/img/yigao/首页/homegrey@2x.png"
        />
        <img
          slot="item-icon-active"
          src="../../assets/img/yigao/首页/首页红@2x.png"
        />
        <div slot="item-text">首页</div>
      </tab-baritem>
      <tab-baritem>
        <img slot="item-icon" src="../../assets/img/yigao/首页/分类灰@2x.png" />
        <div slot="item-text">分类</div>
      </tab-baritem>
      <tab-baritem path="/shoppcart">
        <img
          slot="item-icon"
          src="../../assets/img/yigao/首页/导航购物车@2x.png"
        />
        <img
          slot="item-icon-active"
          src="../../assets/img/yigao/购物车/购物车红@2x.png"
        />
        <div slot="item-text">购物车</div>
      </tab-baritem>
      <tab-baritem>
        <img slot="item-icon" src="../../assets/img/yigao/首页/我的灰@2x.png" />
        <div slot="item-text">我的</div>
      </tab-baritem>
    </tab-bar>
  </div>
</template>
<script>
//底部导航栏插槽和组件
import TabBar from "./TabBar.vue";
import TabBaritem from "./TabBaritem.vue";
export default {
  name: "Navigation",
  components: {
    TabBar,
    TabBaritem,
  },
};
</script>
<style scoped>
#navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>
