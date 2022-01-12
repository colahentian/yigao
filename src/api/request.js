import axios from 'axios'


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

export default request;