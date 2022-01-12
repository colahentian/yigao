<template>
  <div id="parameter">
    <div class="parambod" v-for="item in param">
      <div class="parambod">
        <div>{{ item.paramName }}</div>
        <div>{{ item.paramValue }}</div>
      </div>
    </div>
  </div>
</template>
<script>
//商品详情页商品参数组件
//请求数据接口
import { commparameter } from "@/api/commodity.js";
export default {
  name: "Parameter",
  data() {
    return {
      //参数页数据
      param: [],
    };
  },
  created() {
    //用首页点击商品id获取接口数据
    let spuid = localStorage.getItem("spuid");
    commparameter(spuid)
      .then((response) => {
        //拿出页面渲染数据
        this.param = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style>
.parambod {
  height: 2.5rem;
  line-height: 2.5rem;
  border-bottom: 1px solid rgb(239, 239, 239);
  background-color: #fff;
  color: rgb(167, 167, 167);
  display: flex;
}
.parambod div {
  width: 11.25rem;
  margin: 0 0.625rem;
}
</style>
