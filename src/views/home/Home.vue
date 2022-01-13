<template>
  <div id="home">
    <hear></hear>
    <homeswiper> </homeswiper>
    <jump></jump>
    <contentd> </contentd>
  </div>
</template>
<script>
import Hear from "../../components/homehear/Hear.vue"; //首页头部搜索栏组件
import Homeswiper from "./Homeswiper.vue"; //首页轮播图组件
import Jump from "./Jump"; //首页分类导航栏组件
import Contentd from "./Contentd"; //首页内容区组件
export default {
  name: "Home",
  components: {
    Hear,
    Homeswiper,
    Jump,
    Contentd,
  },
};
</script>
<style>
@import "../../assets/css/home.css";
</style>
