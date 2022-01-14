<template>
  <div id="hear">
    <div class="hearlet" @click="hearinde">
      {{addres}}
      <img
        src="../../assets/img/yigao/首页/xiao_youjiantou@2x.png"
        class="homeimg"
      />
    </div>
    <div class="hearinp">
      <input type="text" style="outline: none" placeholder="请输入关键字" />
      <div class="hearshopp">
        商品
        <img
          src="../../assets/img/yigao/首页/xiao_youjiantou@2x.png"
          class="homeimg"
        />
      </div>
      <img src="../../assets/img/yigao/首页/搜索@2x.png" class="hearinpimg" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Hear",
  methods:{
    hearinde(){
      this.$router.push('/address')
      this.$store.commit('showtabar')
    }
  },
  computed:{
    addres(){
      return  localStorage.getItem("addre")
    }
  }
};
</script>
<style>
@import "../../assets/css/home.css";
</style>
