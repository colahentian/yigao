<template>
  <div id="app">
    <router-view></router-view>
    <navigation> </navigation>
  </div>
</template>
<script>
import Home from "./views/home/Home"; //主页
import Navigation from "./components/tabbar/Navigation.vue"; //底部导航栏
export default {
  name: "App",
  components: {
    Home,
    Navigation,
  },
};
//完美适配
(function () {
  function resize() {
    const html = document.documentElement;
    const width = html.clientWidth;
    const heigth = html.clientHeight;
    html.style.fontSize = `${heigth / 50.75}px`;
  }
  window.addEventListener("resize", resize);
  resize();
})();
</script>
<style>
html,
body,
#app {
  height: 100%;
}
</style>
