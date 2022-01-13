import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import shoppcart from './shoppcart'
export default new Vuex.Store({
    modules: {
        home,
        shoppcart
    }
})