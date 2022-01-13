
const state = {
    shoppcarboll: true, //空购物车隐藏条件    
    showtw: false, //商品规格界面弹出条件    
    token: '', //token变量     
    commoskuid: '', //根据首页点击,所变化的商品详情页id
    commcondata: [], //商品详情页主体数据
    redpaht: '', //登陆之后应该进入的地址
};
const mutations = {
    //token本地存储
    changeuser(state, logintoken) {
        state.token = logintoken;
        localStorage.setItem('token', logintoken);
    },
    //本地存储登陆之后的地址
    redirapath(state, path) {
        state.redpaht = path
        localStorage.setItem('path', path);
    },
    //首页所点击商品的skuid,然后渲染该商品
    addcommod(state, contspuid) {
        state.commoskuid = contspuid.spuId;
        localStorage.setItem('spuid', contspuid.spuId);
        state.commcondata = contspuid;
    },
    //点击购买事件,弹出层关闭,空购物车状态消失
    addbuyCart(state) {
        state.shoppcarboll = false
        state.showtw = false
    },
    //购买界面弹出层,点击遮罩层关闭弹出层
    commshow(state) {
        state.showtw = !state.showtw
    },
};
const actions = {

};
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}