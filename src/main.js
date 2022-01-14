import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图组件
import 'swiper/css/swiper.css' //轮播图样式
import { List } from 'vant'; //上划刷新组件
import { Dialog } from 'vant'; //确认框组件
import { Toast } from 'vant'; //提示框组件
import 'vant/lib/index.css' //vant样式引入
import { IndexBar, IndexAnchor,Cell } from 'vant';//index导航地址栏


Vue.use(Cell);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(VueAwesomeSwiper)
Vue.use(Dialog);
Vue.use(List);
Vue.use(Toast);
Vue.config.productionTip = false


new Vue({
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app');