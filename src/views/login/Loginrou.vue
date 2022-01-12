<template>
  <div id="loginrou">
    <div class="loginroubor">
      <div class="loginroure">
        <input
          type="text"
          style="outline: none"
          maxlength="11"
          onkeyup="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          v-model="username"
        />
        <img
          src="../../assets/img/yigao/登录注册/phone@2x.png"
          class="logrouicon"
        />
      </div>
      <div class="loginroure">
        <input
          type="password"
          style="outline: none"
          placeholder="请输入密码"
          v-model="password"
          :conkeyup="(password = password.replace(/\s+/g, ''))"
        />
        <img
          src="../../assets/img/yigao/登录注册/key@2x.png"
          class="logrouicon"
        />
      </div>
    </div>
    <div>
      <div class="logroured logroucen logroucenter" @click="login">登录</div>
      <div class="logrouwen logroucen">忘记密码</div>
    </div>
  </div>
</template>
<script>
//登录页登录子路由
//验证手机号是否注册,登录接口
import { register, userlogin } from "@/api/login.js";
//弹窗组件
import { Toast } from "vant";
export default {
  name: "Loginrou",
  data() {
    return {
      username: "", //绑定的手机号和密码
      password: "",
    };
  },
  created() {
    //在第一次进入页面时，获取重定向地址，使用vuex本地存储
    let path = this.$route.query.redirect;
    if (path != undefined && path != null) {
      this.$store.commit("redirapath", path);
    }
  },
  methods: {
    //判断手机号是否注册
    login() {
      //登录前所点击的地址
      let r = this.$store.state.redpaht;
      let _this = this;
      //把手机号,密码赋值给a,b
      let a = this.username;
      let b = this.password;
      //对手机号,密码进行简单判断
      if (a === "" || b === "") {
        //失败提示
        Toast.fail({
          message: "手机号或密码不能为空",
          duration: 2000,
        });
      } else {
        //把手机号发送给接口进行判断
        register(a)
          .then((response) => {
            let codedata = response.data.msg;
            //判断返回的数据,如果注册过,可以登录
            if (codedata === "此号码已注册") {
              //号码已经注册,调用登录接口,并传入三个参数
              this.$options.methods.logintow(a, b, _this, r);
            } else {
              //如果没有注册,跳转注册
              this.$router.push("/login/register");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    //接收电话号,密码,_this，重定向地址
    logintow(a, b, _this, r) {
      //把手机号和密码赋给对象
      let logindata = {
        mobile: a,
        password: b,
      };
      //把对象发给后端进行验证
      userlogin(logindata)
        .then((response) => {
          //拿出code和token
          let logintoken = response.data.token;
          let logincode = response.data.code;
          //code为0代表登录成功
          if (logincode === 0) {
            console.log(logincode);
            //把token传到vuex本地存储
            _this.$store.commit("changeuser", logintoken);
            //删除本地存储重定向地址
            localStorage.removeItem("path");
            //跳转欢迎页面
            _this.$router.push("/welcome");
            //出现成功弹窗
            Toast.success({
              message: "登录成功",
              duration: 1000,
            });
            //延迟跳转重定向页面
            setTimeout(function () {
              _this.$router.push(r || "/");
            }, 2000);
          } else {
            //注册失败提示
            Toast.fail({
              message: "手机号或密码错误",
              duration: 2000,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
.loginroubor {
  overflow: hidden;
}
.loginroubor div {
  border-bottom: 1px solid rgb(244, 244, 244);
}
.logroucen {
  width: 9.375rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.logroucenter {
  margin: 2.1875rem auto 0.625rem;
}
.loginroure {
  position: relative;
}
.loginroure input {
  display: block;
  width: 100%;
  height: 2.1875rem;
  border: 0;
  margin-top: 1.875rem;
  padding-left: 3.125rem;
  border: none;
  border-bottom: 1px solid rgb(244, 244, 244);
}

.logrouicon {
  width: 16px;
  height: 21px;
  position: absolute;
  left: 1.25rem;
  top: 0.375rem;
}
.logroured {
  width: 11.25rem;
  background-color: rgb(216, 27, 31);
  color: white;
  border-radius: 0.1875rem;
}
.logrouwen {
  color: rgb(137, 137, 137);
  margin: 0 auto;
}
</style>
