<template>
  <div id="jump">
    <div v-for="item in jumpd" class="jum">
      <img :src="item.cimage" @click="dele" />
      {{ item.name }}
    </div>
  </div>
</template>
<script>
//首页分类导航组件
//请求数据接口
import { homedata } from "@/api/home.js";
export default {
  name: "Jump",
  data() {
    return {
      jumpd: "", //页面数据
      current: 1, //页数
      limit: 1, //条数
    };
  },
  created() {
    //请求页面数据
    homedata(this.current, this.limit)
      .then((res) => {
        //拿出页面数据
        this.jumpd = res.data.data.categoryList;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    //删除token
    dele() {
      localStorage.removeItem("token");
      console.log(localStorage.getItem("token"));
    },
  },
};
</script>
<style scoped>
#jump {
  display: flex;
  background-color: white;
  width: 96%;
  margin: 0.5rem 2%;
  height: 4.375rem;
}
.jum {
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
}
.jum img {
  display: block;
  width: 1.5625rem;
  height: 1.5625rem;
  margin: 0.8125rem auto 0.4375rem;
}
</style>
