import request from "./request";
//详情页图片数据接口
export const commodata = (spuid) => request({
    url: `/fenxiaoback/goodsfront/getGoodParams/${spuid}`,
    method: 'get'
})

//详情页商品参数接口
export const commparameter = (spuid) => request({
    url: `/fenxiaoback/pms-spu-generic-param-value/getGoodParams/${spuid}`,
    method: 'get'
})

//将商品添加到购物车接口
export const commaddshoppcart = (skuId, num) => request({
    url: `/fenxiaoback/tb-cart/addToCart/${skuId}/${num}`,
    method: 'get'
})