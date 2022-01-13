<template>
  <div id="shoppcart">
    <shopphead></shopphead>
    <shoppdata></shoppdata>
    <!-- 如果购物车数组长度小于1,显示空购物车 -->
    <div class="shoppcont" v-show="shopplength< 1">
      <shoppshow></shoppshow>
    </div>
    <shoppcarsett></shoppcarsett>
  </div>
</template>
<script>
import Shopphead from "./Shopphead.vue"; //购物车顶部组件
import Shoppdata from "./Shoppdata.vue"; //购物车商品组件
import Shoppcarsett from "./Shoppcarsett.vue"; //购物车底部结算组件
import Shoppshow from "./Shoppshow.vue"; //空购物车页
export default {
  name: "Shoppcart",
  components: {
    Shopphead,
    Shoppdata,
    Shoppcarsett,
    Shoppshow,
  },
  data() {
    return {
    };
  },
  computed:{
    shopplength:function(){
      return this.$store.state.shoppcart.shocartdata.length
    }
  }
};
</script>
<style>
@import "../../assets/css/shoppcart.css";
</style>
