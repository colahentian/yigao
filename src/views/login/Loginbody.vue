<template>
  <div id="loginbody">
    <div class="loginhear">
      <router-link to="/home">
        <img src="../../assets/img/yigao/首页/back@2x.png" class="loginimgon" />
      </router-link>
    </div>
    <div class="loginimg">
      <img
        src="../../assets/img/yigao/登录注册/loglogo@2x.png"
        class="loginimgtw"
      />
    </div>
    <div class="loginbody">
      <div>
        <router-link to="/login/loginrou" active-class="loginborred"
          >登录</router-link
        >
      </div>
      <div>
        <router-link to="/login/register" active-class="loginborred"
          >注册</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
//登录页头部数据
export default {
  name: "Loginbody",
};
</script>
