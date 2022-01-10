import Vue from 'vue'
import Vuex from 'vuex'
//获取购物车商品,删除商品,留言修改接口
import { selectshoppcart, delmembercart, additemnotes } from '@/api/shoppcart.js'
//弹窗组件
import { Toast } from "vant";
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        shocartdata: [], //购物车数组
        shoppcarboll: true, //空购物车隐藏条件
        shoppallcheck: false, //全选测试条件
        showtw: false, //商品规格界面弹出条件
        allcheck: false, //全选按钮条件
        messageindx: '', //当前商品留言所在数组的index
        token: '', //token变量
        messagedata: [], //随用户点击不同的商品，变换商品
        messageskuid: '', //所点击商品的skuid，用于更改留言
        messagemodel: '', //留言界面双向绑定数据
        deleshoppskuids: [], //购物车满足删除条件的skuid数组
        commoskuid: '', //根据首页点击,所变化的商品详情页id
        commcondata: [], //商品详情页主体数据
        redpaht: '', //登陆之后应该进入的地址
    },

    mutations: {
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
            state.commcondata = contspuid;
        },
        //购物车反选按钮
        shoppallcheck(state) {
            state.allcheck = !state.allcheck;
            state.shocartdata.forEach((item) => {
                return (item.check = state.allcheck)
            })
        },
        ///购物车全选按钮的状态
        all(state) {
            //如果购物车数组为空,则全选为false
            if (state.shocartdata.length < 1) {
                return state.allcheck = false
            }
            //遍历数组里的条件,有一个为false,则全选为false
            let ind = state.shocartdata.findIndex((item) => {
                return !item.check;
            });
            if (ind == -1) {
                state.allcheck = true;
            } else {
                state.allcheck = false;
            }
            state.shocartdata.push()
        },
        ///购物车单选按钮点击事件
        shoppcheck(state, index) {
            state.shocartdata[index].check = !state.shocartdata[index].check;
            //调用判断全选按钮状态方法
            this.commit('all');
        },
        //购物车数据
        shoppadddata(state, data) {
            //把接口数据赋给购物车数组
            state.shocartdata = data
        },
        //购物车留言点击事件
        messnull(state, index) {
            //拿出所点击商品id
            let skudi = state.shocartdata[index].skuId
            selectshoppcart()
                .then((res) => {
                    //找出该商品渲染到留言页
                    res.data.data.forEach((item, index) => {
                        //找出指定商品,并把当前留言双向绑定
                        if (item.skuId == skudi) {
                            state.messagedata = item
                            state.messagemodel = item.notes
                        }
                    })
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //留言界面绑定的内容实时更新
        messageup(state, value) {
            state.messagemodel = value
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
        //购物车数组push方法刷新
        shopprefresh(state) {
            state.shocartdata.push()
        },
        //跳转页面回到购物车全选条件
        shoppcartchec(state) {
            state.allcheck = false
        },
        //修改留言
        messageadd(state) {
            //把商品id和所要修改的内容,传进对象,发送给接口
            let itemNotesVo = {
                notes: state.messagemodel,
                skuId: state.messagedata.skuId
            }
            additemnotes(itemNotesVo)
                .then((res) => {})
                .catch(function(error) {
                    console.log(error);
                });
            //刷新一下数组,出现成功弹窗
            state.shocartdata.push()
            Toast.success({
                message: "修改留言成功",
                duration: 1300,
            });
        },

        //购物车删除事件
        delmember(state) {
            //循环购物车数据
            if (state.allcheck == true) {
                state.shocartdata.forEach((item, index) => {
                    //满足删除条件,拿出skuid传入临时数组   
                    let skuid = state.shocartdata[index].skuId
                    state.deleshoppskuids.push(skuid)
                })
                state.shocartdata.splice(0)
            } else {
                state.shocartdata.forEach((item, index) => {
                    //满足删除条件,拿出skuid传入临时数组
                    if (item.check == true) {
                        // console.log(index);
                        let skuid = state.shocartdata[index].skuId
                        state.deleshoppskuids.push(skuid)
                        state.shocartdata.splice(index, 1)
                    }
                })
            }
            //使用接口删除指定商品
            delmembercart(state.deleshoppskuids)
                .then((res) => {
                    // console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
            this.commit('all');
            //提示购买成功弹窗;
            Toast.success({
                message: "删除商品成功",
                duration: 1300,
            });
        },
    },
    actions: {},
    modules: {}
})