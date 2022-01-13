<template>
  <div id="commcont">
    <div class="commcont commwhite">
      <div class="commpl">{{ commdata.title | undein }}</div>
      <div class="commpl commdao">
        <div class="commsize">
          {{ commdata.price | money }}
        </div>
        <div class="commmr">{{ commdata.stock | sold }}</div>
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
//获取页面数据
import { commodata } from "@/api/commodity.js";
export default {
  name: "Commcont",
  data() {
    return {
      commdata: [],
    };
  },

  //过滤器,对价格和文字进行拼接
  filters: {
    undein(data) {
      if (data == undefined) {
        return (data = "");
      } else {
        return data;
      }
    },
    money(data) {
      if (data == undefined) {
        return (data = "￥");
      } else {
        return "￥" + data;
      }
    },
    sold(data) {
      if (data == undefined) {
        return (data = "已售");
      } else {
        return "已售" + data;
      }
    },
  },
  created() {
    //用首页点击商品id获取接口数据
    let spuid = localStorage.getItem("spuid");
    commodata(spuid)
      .then((response) => {
        this.commdata = response.data.data.skus[0];
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
