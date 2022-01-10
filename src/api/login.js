import request from "./request";

//判断手机号是否注册接口
export const register = (a) => request({
    url: `/fenxiaoback01/ucenter-member/isRegist/${a}`,
    method: 'get'
});

//登录接口
export const userlogin = (logindata) => request({
    url: `/fenxiaoback01/ucenter-member/login`,
    method: 'post',
    data: logindata
})

//获取验证码接口
export const Verification = (regcode) => request({
    url: `/fenxiaoback01/ucenter-member/registSendSMS/${regcode}`,
    method: 'get'
});

//校验验证码是否正确接口
export const checkcode = (check) => request({
    url: `/fenxiaoback01/ucenter-member/verifyCode`,
    method: 'post',
    data: check
});

//注册账号接口
export const registration = (Userdata) => request({
    url: `/fenxiaoback01/ucenter-member/register`,
    method: 'post',
    data: Userdata
});