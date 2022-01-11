<template>
  <div id="home">
    <!-- 首页头部搜索栏 -->
    <hear></hear>
    <!-- 首页轮播图 -->
    <homeswiper> </homeswiper>
    <!-- 首页分类导航栏 -->
    <jump></jump>
    <!-- 首页内容区 -->
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
