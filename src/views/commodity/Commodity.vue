<template>
  <div id="commodity">
    <div class="commswipt commwhite">
      <commoswiper></commoswiper>
    </div>
    <commcont> </commcont>
    <router-view></router-view>
    <commbar> </commbar>
    <!-- 商品规格弹出层 -->
    <div class="vue-popup">
      <buypage></buypage>
    </div>
  </div>
</template>
<script>
import Commoswiper from "./Commoswiper.vue"; //详情页轮播图组件
import Commcont from "./Commcont.vue"; //详情页主要内容区组件
import Commbar from "./Commbar.vue"; //详情页底部栏组件
import Buypage from "./Buypage"; //详情页商品规格组件

export default {
  name: "Commodity",
  data() {
    return {};
  },
  components: {
    Commoswiper,
    Commcont,
    Commbar,
    Buypage,
  },
};
</script>
<style>
@import "../../assets/css/commodity.css";
</style>
