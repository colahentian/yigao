import Vue from 'vue'
import VueRouter from 'vue-router'
const Details = () =>
    import ('../views/commodity/Details') //商品规格页
const Parameter = () =>
    import ('../views/commodity/Parameter') //商品参数页
const Commodity = () =>
    import ('../views/commodity/Commodity') //商品详情主页
const Message = () =>
    import ('../views/shoppcart/Message') //留言页
const Buypage = () =>
    import ('../views/commodity/Buypage') //商品规格页
const Loginrou = () =>
    import ('../views/login/Loginrou.vue') //登录页
const Login = () =>
    import ('../views/login/Login.vue') //登录主页
const Register = () =>
    import ('../views/login/Register.vue') //注册页
const Welcome = () =>
    import ('../views/login/Welcome.vue') //欢迎页
const Home = () =>
    import ('../views/home/Home') //主页
const Shoppcart = () =>
    import ('../views/shoppcart/Shoppcart') //购物车页
import { Dialog } from "vant"; //弹窗组件
Vue.use(VueRouter)


//解决路由版本更新产生的问题(控制台报错)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
        //默认首页
        path: '',
        redirect: '/home',
    },
    {
        //首页
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        //商品详情页
        path: '/commodity',
        // meta: {
        //     requireAuth: true,
        // },
        component: Commodity,
        children: [{
                path: '',
                redirect: 'details',
            },
            {
                //商品详情页
                path: "details",
                name: "Details",
                component: Details,
                meta: {
                    requireAuth: true,
                },
            },
            {
                //商品参数页
                path: "parameter",
                name: "Parameter",
                component: Parameter
            },
        ]
    },
    {
        //商品规格页
        path: '/buypage',
        name: 'Buypage',
        component: Buypage
    },
    {
        //购物车
        path: '/shoppcart',
        meta: {
            requireAuth: true,
        },
        name: 'Shoppcart',
        component: Shoppcart,

    },
    {
        //留言页
        path: '/message',
        name: 'Message',
        component: Message
    },

    {
        //登录主页
        path: '/login',
        component: Login,
        children: [{
                path: '',
                redirect: 'loginrou',
            },
            {
                //登录页
                path: 'loginrou',
                name: 'Loginrou',
                component: Loginrou
            }, {
                //注册页
                path: 'register',
                name: 'Register',
                component: Register
            },

        ]
    },
    {
        //欢迎页
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    },

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //判断是否存在token
    const islogin = localStorage.token ? true : false
        //判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        //判断是否有token
        if (islogin) {
            next()
        } else {
            //没有token出现弹框
            Dialog.confirm({
                    title: "您还未登录,请去登录",
                    confirmButtonColor: "red",
                    width: '250px',
                })
                .then(() => {
                    //确定前往登录
                    next({
                        path: "/login/loginrou",
                        //保存当前点击地址
                        query: { redirect: to.fullPath }
                    })
                })
                .catch(() => {

                });
        }
    } else {
        next()
    }
})


export default router