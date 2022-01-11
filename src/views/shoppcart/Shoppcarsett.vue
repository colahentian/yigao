<template>
  <div id="shoppcarsett">
    <div class="shoppsett">
      <div class="cartbox">
        <span class="shoppradio" @click="shopcartcheck">
          <img
            src="../../assets/img/yigao/购物车/gou@2x.png"
            v-show="$store.state.allcheck" /></span
        ><span>全选</span>
      </div>
      <div>
        <div>
          合计: <span class="shoppclred"> {{ cartprice | money }} &nbsp; </span>
        </div>
        <div class="shoppbared">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
//购物车价格结算组件
export default {
  name: "Shoppcarsett",
  methods: {
    //全选按钮点击事件
    shopcartcheck() {
      this.$store.commit("shoppallcheck");
    },
  },

  computed: {
    //计算选中商品的总价
    cartprice() {
      return (
        //过滤
        this.$store.state.shocartdata
          .filter((item) => {
            return item.check;
          })
          .reduce((ownSpec, item) => {
            //开始计算总价
            return (ownSpec += item.totalPrice);
          }, 0)
      );
    },
  },

  //调用改变全选按钮状态方法
  created() {
    this.$store.commit("shoppcartchec");
  },
  filters: {
    //拼接价格
    money(data) {
      return "￥" + data;
    },
  },
};
</script>
