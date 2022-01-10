<template>
  <div id="register">
    <div class="regisbody">
      <div class="regisinp">
        <input
          type="text"
          style="outline: none"
          maxlength="11"
          onkeyup="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号"
          v-model="mobile"
        />
        <img src="../../assets/img/yigao/登录注册/phone@2x.png" />
      </div>
      <div class="regisinp">
        <input
          type="text"
          style="outline: none"
          maxlength="4"
          placeholder="请输入验证码"
          v-model="code"
        />
        <img src="../../assets/img/yigao/登录注册/num@2x.png" />
        <div v-show="verification" class="verif">{{ conunt }}秒后重新</div>
        <div class="regired" @click="regscod">获取验证码</div>
      </div>
      <div class="regisinp">
        <input
          type="password"
          style="outline: none"
          placeholder="请输入密码"
          v-model="password"
        />
        <img src="../../assets/img/yigao/登录注册/key@2x.png" />
      </div>
    </div>
    <div>
      <div class="regisbgred regiscen" @click="register">注册</div>
      <div class="registext">点击注册即表示您已经同意用户协议</div>
    </div>
  </div>
</template>
<script>
//登录页注册子路由
//判断手机号是否注册,发送验证码,校验验证码,注册接口
import {
  Verification,
  register,
  checkcode,
  registration,
} from "@/api/login.js";
//弹窗组件
import { Toast } from "vant";
export default {
  name: "Register",
  data() {
    return {
      mobile: "", //手机号
      code: "", //验证码
      password: "", //密码
      verification: false, //验证码倒计时显示条件
      timer: null, //倒计时
      conunt: "", //倒计时时间
    };
  },
  methods: {
    //验证码发送方法
    regscod() {
      //判断手机号是否为空
      let regcode = this.mobile;
      if (regcode != null && regcode != "") {
        //手机号不为空则显示动画,并且发送验证码
        this.verification = !this.verification;
        //倒计时初始值
        const time = 90;
        if (!this.timer) {
          this.conunt = time;
          //开始倒计时
          this.timer = setInterval(() => {
            //如果倒计时值小于0，终止程序
            if (this.conunt > 0 && this.conunt <= time) {
              this.conunt--;
            } else {
              //关闭倒计时,清空变量
              this.verification = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        //发送手机号给后端接口进行判断
        Verification(regcode)
          .then((response) => {
            //成功发送,出现弹窗
            Toast.success({
              message: "验证码已发送",
              duration: 1500,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //如果手机号为空则不能发送
        Toast.fail({
          message: "手机号不能为空",
          duration: 1500,
        });
      }
    },
    //判断手机号是否注册过
    register() {
      let a = this.mobile; //手机号
      let b = this.code; //验证码
      let c = this.password; //密码
      //判断手机号,验证码,密码是否为空
      if (a != "" && b != "" && c != "") {
        //三者都不为空，则判断手机号是否注册过
        register(a)
          .then((response) => {
            //拿到后端返回值，进行判断
            let codedata = response.data.msg;
            if (codedata === "此号码已注册") {
              //如果号码已经注册,跳转登录页
              this.$router.push("/login/loginrou");
              //显示已注册弹窗
              Toast.fail({
                message: "您已注册,请登录",
                duration: 1500,
              });
            } else {
              //手机号没有注册开始校验验证码
              this.$options.methods.regichec(a, b, c); //给方法发送手机号，验证码，密码
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //手机号,验证码,密码有一个为空则出现弹窗
        Toast.fail({
          message: "手机号,验证码或密码不能为空",
          duration: 1500,
        });
      }
    },
    //接收手机号，验证码，密码
    regichec(a, b, c) {
      let check = {
        code: b,
        phone: a,
      };
      //把手机号和验证码发给接口
      checkcode(check)
        .then((response) => {
          //拿出返回值,如果为200验证码和手机号正确
          let codep = response.data.code;
          if (codep === 200) {
            //开始注册
            let Userdata = {
              code: b, //验证码
              mobile: a, //手机号
              nickname: null,
              password: c, //密码
              rcode: null,
            };
            //把用户信息发给后端进行注册
            registration(Userdata)
              .then((response) => {
                let good = response.data.code;
                //对返回值进行判断
                if (good == 200) {
                  //如果为200注册成功，成功弹窗
                  Toast.success({
                    message: "注册成功,请去登录",
                    duration: 1500,
                  });
                  //注册成功跳转登录页
                  this.$router.push("/login/loginrou");
                } else {
                  //不为200注册失败
                  Toast.fail({
                    message: "注册失败",
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            //手机号或验证码错误
            Toast.fail({
              message: "手机号或验证码错误",
              duration: 1500,
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
.regisbody {
  overflow: hidden;
}
.regiscen {
  width: 9.375rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.regisinp input {
  display: block;
  width: 100%;
  height: 2.1875rem;
  border: 0;
  margin-top: 1.875rem;
  padding-left: 3.125rem;
  border-bottom: 1px solid rgb(244, 244, 244);
}
.regisinp {
  position: relative;
}
.regisinp img {
  width: 16px;
  height: 21px;
  position: absolute;
  left: 1.25rem;
  top: 0.375rem;
}
.verif {
  font-size: 0.8125rem;
  color: rgb(216, 27, 31);
  position: absolute;
  top: -0.625rem;
  right: 0;
}
.regired {
  font-size: 0.8125rem;
  color: rgb(216, 27, 31);
  position: absolute;
  bottom: 0.625rem;
  right: 0;
}
.regisbgred {
  width: 11.25rem;
  background-color: rgb(216, 27, 31);
  color: white;
  border-radius: 0.1875rem;
  margin: 2.1875rem auto 0.9375rem;
}
.registext {
  font-size: 0.8125rem;
  width: 100%;
  text-align: center;
  color: rgb(110, 110, 110);
}
</style>
