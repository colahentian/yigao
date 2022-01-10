<template>
  <div id="welcome">
    <div class="welcomeimg">
      <img
        src="../../assets/img/yigao/登录注册/botcircle@2x.png"
        class="welcomeimgon"
      />
      <img
        src="../../assets/img/yigao/登录注册/piccircle@2x.png"
        class="welcomeimgtw"
      />
      <div class="welcometext">欢迎登录</div>
    </div>

    <div>
      <img
        src="../../assets/img/yigao/登录注册/wellogo@2x.png"
        class="welcomeimgth"
      />
    </div>
  </div>
</template>
<script>
//欢迎界面
export default {
  name: "Welcome",
};
</script>
<style>
#welcome {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
}
.welcomeimg {
  width: 6.875rem;
  height: 6.875rem;
  margin: 6.875rem auto;
  position: relative;
}
.welcomeimgon {
  width: 6.875rem;
  height: 6.875rem;
}
.welcomeimgtw {
  width: 6.25rem;
  height: 6.25rem;
  position: absolute;
  left: 0.3125rem;
  top: 0.3125rem;
}
.welcometext {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.welcomeimgth {
  display: block;
  width: 6.875rem;
  height: 2.5rem;
  margin: 18.75rem auto 0;
}
</style>
