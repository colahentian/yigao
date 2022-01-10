<template>
  <div id="commoswiper">
    <div class="swiper-container" style="z-index: 0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in comosswpier">
          <img :src="item" class="commswiperimg" />
        </div>
      </div>
      <div id="sset" class="swiper-pagination"></div>
    </div>
    <router-link to="/home">
      <img src="../../assets/img/yigao/主页/back@2x.png" class="commreturn" />
    </router-link>
  </div>
</template>
<script>
//商品详情页轮播图组件
//swiper引入
import Swiper from "swiper";
//获取页面数据
import { commodata } from "@/api/commodity.js";
export default {
  name: "Commoswiper",
  data() {
    return {
      //轮播图图片
      comosswpier: [],
    };
  },
  methods: {
    commswiper() {
      //轮播图组件
      new Swiper(".swiper-container", {
        //修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        //修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        //是否自动轮播
        loop: true,
        autoplay: {
          //每次轮播的间隔,是否显示左右切换按钮,用户点击不停止轮播
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      });
    },
  },
  created() {
    //用首页点击商品id获取接口数据
    let spuid = this.$store.state.commoskuid;
    commodata(spuid)
      .then((response) => {
        //截取图片地址字符串,返回给数组
        this.comosswpier = response.data.data.spuImage.split(",");
        //当数据请求到之后,初始化swiper
        this.$nextTick(() => {
          this.commswiper();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style>
#commoswiper {
  height: 21.875rem;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  position: relative;
  background-color: rgb(236, 236, 236);
}
.swiper-slide a {
  display: block;
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.commswiperimg {
  width: 100%;
  height: 21.875rem;
}

#sset {
  display: block;
  width: 100px;
  position: absolute;
  bottom: 0.3125rem;
  left: 72%;
  z-index: 50;
}

.swiper-container {
  height: 100%;
}
#sset .swiper-pagination-bullet {
  background: white;
}

#sset .swiper-pagination-bullet-active {
  background: red;
}
</style>
