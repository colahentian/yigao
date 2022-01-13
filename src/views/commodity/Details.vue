<template>
  <div id="details">
    <div class="dataiimg" v-for="item,index in detai" :key="index">
      <img :src="item" />
    </div>
  </div>
</template>
<script>
//商品详情页商品详情组件
//获取页面数据接口
import { commodata } from "@/api/commodity.js";
export default {
  name: "Details",
  data() {
    return {
      //详情页图片数据
      detai: [],
    };
  },
  created() {
    //用首页点击商品id获取接口数据
   let spuid =  localStorage.getItem("spuid");
    commodata(spuid)
      .then((res) => {
        //截取图片地址字符串
        this.detai = res.data.data.spuImage.split(",");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style>
#details {
  padding-bottom: 3.375rem;
  background-color: rgb(236, 236, 236);
}
.dataiimg {
  width: 96%;
  margin: 2% 2% 0;
}
img {
  width: 100%;
}
.dataipadd {
  padding: 0 2%;
}
</style>
