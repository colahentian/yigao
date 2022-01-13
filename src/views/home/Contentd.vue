<template>
  <div id="contentd">
    <van-list
      v-model="loading"
      loading-text="正在加载中..."
      :finished="finished"
      finished-text="没有更多了"
      @load="contcheck"
      class="conbiao"
    >
      <div v-for="(item, index) in contd" :key="index" class="conju">
        <div class="contenda" @click="contedrou(index)">
          <img :src="item.imgurl" class="conten-zhuo" />

          <div class="contb">
            <div class="conda">{{ item.spuTitle }}</div>
            <div>
              <span class="conred"> {{ item.disCountPrict | money }}</span>
              <span class="conshan"> {{ item.price | money }} </span>
              <span>&nbsp; {{ item.doneCont | shopp }}</span>
            </div>
            <div>
              <span>{{ item.storeName }}</span>
              <span class="conten-ml">{{ item.city }}</span>
              <span
                ><img
                  src="../../assets/img/yigao/我的/xiao_youjiantou@2x.png"
                  class="conten-you"
              /></span>
              <span class="conten-poa">. . .</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
//首页分页查询组件
//请求数据接口
import { homeconteddata } from "@/api/home.js";
export default {
  name: "Contentd",
  data() {
    return {
      contd: [], //页面渲染数据
      loading: false, //加载动画出现条件
      finished: false, //结束动画出现条件
      current: 1, //当前请求数据页数
      limit: 7, //每次请求数据数量
      quantity: "", //请求数据时接口数组的长度
    };
  },
  //对价格和文字进行拼接
  filters: {
    money(data) {
      return "￥" + data;
    },
    shopp(data) {
      return data + "人已购买";
    },
  },
  methods: {
    contedrou(index) {
      //用户首页点击商品,拿出该商品
      let contspuid = this.contd[index];
      //把当前商品传到vuex,详情页直接渲染
      this.$store.commit("addcommod", contspuid);
      //跳转详情页
      this.$router.push("commodity/details");
    },
    //组件监听,动画的执行条件
    contcheck() {
      //使用定时器限制动画执行时间
      setTimeout(() => {
        //加载动画消失,结束动画出现
        this.loading = false;
        //如果接口数组的长度为0,出现结束动画
        if (this.quantity == 0) {
          this.finished = true;
        }
      }, 1500);
    },

    //请求数据
    condata() {
      homeconteddata(this.current, this.limit)
        .then((res) => {
          //拿出页面渲染数据，和数组内容的长度
          let data = res.data.data.indexSpuVos;
          this.quantity = res.data.data.indexSpuVos.length;
          //请求到的数据都存进一个数组
          this.contd.push(...data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    //最开始请求一次数据
    this.condata();
    this.$nextTick(() => {
      //获取contentd这个盒子
      const el = document.querySelector("#contentd");
      //框框的高度
      const offsetHeight = el.offsetHeight;
      el.onscroll = () => {
        //滚动框距离顶部的高度
        const scrollTop = el.scrollTop+0.5;
        //整个内容区的高度
        const scrollHeight = el.scrollHeight;
        if (offsetHeight + scrollTop >= scrollHeight) {
          console.log(1);
          // 滑到底部时,如果接口中还有数据,请求数据,页数+1
          //当接口数组长度为0时,出现结束动画
          if (this.quantity != 0) {
            this.current += 1;
            //使用定时器限制动画执行时间
            setTimeout(() => {
              this.condata();
            }, 1500);
          }
        }
      };
    });
  },
};
</script>
