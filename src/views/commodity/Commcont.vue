<template>
  <div id="commcont">
    <div class="commcont commwhite">
      <div class="commpl">{{ $store.state.commcondata.spuTitle }}</div>
      <div class="commpl commdao">
        <div class="commsize">
          {{ $store.state.commcondata.disCountPrict | money }}
        </div>
        <div class="commmr">{{ $store.state.commcondata.doneCont | sold }}</div>
      </div>
      <div class="commbrand">
        <div class="commpl">
          <img src="../../assets/img/yigao/购物车/gou@2x.png" class="commdui" />
          品牌制造商直供
        </div>
        <div>
          <img src="../../assets/img/yigao/购物车/gou@2x.png" class="commdui" />
          品牌制造商直供
        </div>
        <div class="commxiao">
          <img src="../../assets/img/yigao/购物车/gou@2x.png" class="commdui" />
          <span
            >品牌制造商直供
            <img
              src="../../assets/img/yigao/我的/xiao_youjiantou@2x.png"
              class="commxiaoyou"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="commrou commwhite">
      <div>
        <router-link to="/commodity/details" active-class="activeon">
          商品详情
        </router-link>
      </div>
      <div>
        <router-link to="/commodity/parameter" active-class="activeon">
          商品参数
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
//商品详情页主体内容组件
export default {
  name: "Commcont",
  //过滤器,对价格和文字进行拼接
  filters: {
    money(data) {
      return "￥" + data;
    },
    sold(data) {
      return "已售" + data;
    },
  },
};
</script>
