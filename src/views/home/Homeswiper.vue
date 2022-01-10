<template>
  <div id="homeswiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in commswiper">
          <div>
            <img :src="item.imageUrl" @click="homebaidu(index)" />
          </div>
        </div>
      </div>
      <div id="set" class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
//首页轮播图组件
//swiper引入
import Swiper from "swiper";
//请求数据接口
import { homedata } from "@/api/home.js";
export default {
  name: "homeswiper",
  data() {
    return {
      commswiper: [], //轮播图图片
      current: 1, //页数
      limit: 1, //条数
    };
  },
  methods: {
    //图片点击事件,如果为第一张图片,跳转百度
    homebaidu(index) {
      if (index == 0) {
        let baid = this.commswiper[index].linkUrl;
        window.location.href = baid;
      }
    },
    homeswiper() {
      //轮播图组件
      new Swiper(".swiper-container", {
        effect: "coverflow",
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
    //使用接口请求图片数据,传入参数
    homedata(this.current, this.limit)
      .then((response) => {
        //拿出图片数组
        this.commswiper = response.data.data.bannerlist;
        //当数据请求到之后,初始化swiper
        this.$nextTick(() => {
          this.homeswiper();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
