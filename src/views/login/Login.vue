<template>
  <div id="login">
    <loginbody> </loginbody>
    <router-view></router-view>
  </div>
</template>
<script>
import Loginbody from "./Loginbody.vue"; //登录头部
export default {
  name: "Login",
  components: {
    Loginbody,
  },
};
</script>
<style>
#login {
  background-color: #fff;
  width: 92%;
  padding: 0 4%;
  height: 100%;
  position: absolute;
  z-index: 50;
}
.loginbody div {
  width: 50%;
  height: 100%;
}
.loginbody a {
  text-decoration: none;
  color: black;
  display: block;
  width: 48px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginhear {
  width: 100%;
  height: 2.8125rem;
  line-height: 2.8125rem;
}
.loginimgon {
  width: 0.625rem;
  height: 0.9375rem;
}
.loginimgtw {
  display: block;
  width: 11.875rem;
  height: 1.875rem;
  margin: 0 auto;
}
.loginimg {
  height: 1.875rem;
  margin: 3.125rem 0;
}
.loginbody {
  display: flex;
  border-bottom: 1px solid rgb(244, 244, 244);
}
.loginbody div {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}

.loginborred {
  border-bottom: 3px solid rgb(217, 22, 20);
}
</style>
