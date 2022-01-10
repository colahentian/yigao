import request from "./request";

//首页轮播图,分类导航数据接口
export const homedata = (current, limit) => request({
    url: `/fenxiaoback01/indexfront/getIndexFrontInfopage/${current}/${limit}`,
    method: 'get'
})

//首页分页数据接口
export const homeconteddata = (current, limit) => request({
    url: `/fenxiaoback01/indexfront/getIndexFrontInfopage/${current}/${limit}`,
    method: 'get'
})