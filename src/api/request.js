import axios from 'axios'
//弹窗组件
import { Toast } from "vant";

const request = axios.create({
    baseURL: '//huijujx.365hy.com/fenxiaoback-0.0.1-SNAPSHOT',
    timeout: 5000
});


//请求拦截器
request.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            config.headers.token = localStorage.getItem('token');
        }
        return config;
    },
    (err) => {
        console.log(err);
    }
);


//响应拦截器
request.interceptors.response.use((response) => {
    return response
}), (error) => {
    if (!error.response) {
        Toast.fail({
            message: "后端接口响应失败，请刷新浏览器重试。",
            duration: 3000,
        });
        return Promise.resolve(error);
    }
    switch (error.response.status) {
        case 401:
            Toast.fail({
                message: "登录信息过期，跳转登陆页",
                duration: 3000,
            });
            localStorage.removeItem("token");
            this.$router.push("/login/loginrou")
            break;
        case 403:
            Toast.fail({
                message: "您没有权限进行此操作",
                duration: 3000,
            });
            break;
        case 404:
            Toast.fail({
                message: "接口网址未找到",
                duration: 3000,
            });
            break;
        default:
            Toast.fail({
                message: "未知错误",
                duration: 3000,
            });
            break;
    }
}






export default request;