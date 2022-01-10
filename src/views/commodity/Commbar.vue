<template>
  <div id="commbar" class="commbar commwhite">
    <div class="commbarlef">
      <div class="commbarzi">
        <img src="../../assets/img/yigao/首页/收藏@2x.png" />
        <div>收藏</div>
      </div>
      <div class="commbarzi">
        <router-link to="/shoppcart">
          <img src="../../assets/img/yigao/首页/购物车灰@2x.png" />
          <div>购物车</div>
        </router-link>
      </div>
    </div>
    <div class="commbarrig">
      <div class="commred" @click="showVuePopup()">加入购物车</div>
      <div class="commbag">立即购买</div>
    </div>
  </div>
</template>
<script>
//商品详情页底部组件
export default {
  name: "Commbar",
  methods: {
    //加入购物车,使用vuex改变隐藏条件,弹出商品规格页
    showVuePopup() {
      this.$store.commit("commshow");
    },
  },
};
</script>
