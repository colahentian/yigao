import request from "./request";

//查询用户购物车列表接口
export const selectshoppcart = () => request({
    url: `/fenxiaoback/tb-cart/selectMemberCart`,
    method: 'get'
})

//购物添加/修改留言接口
export const additemnotes = (itemNotesVo) => request({
    url: `/fenxiaoback/tb-cartitem/addItemNotes`,
    method: 'post',
    data: itemNotesVo
})

//删除用户购物车中的商品接口
export const delmembercart = (skuids) => request({
    url: `/fenxiaoback/tb-cart/delMemberCartItem`,
    method: 'post',
    data: skuids
})