<template>
  <div id="addrsee">
    <div class="addhear">
      <div class="addhead">
        <img src="../../assets/img/yigao/首页/back@2x.png" @click="gohome" />
        <div>地址</div>
        <div class="addrig">保存</div>
      </div>
    </div>
    <van-index-bar class="indexbar">
      <div v-for="(item, index) in adddata" :key="index">
        <van-index-anchor :index="item.initial"
          >{{ item.initial }}
        </van-index-anchor>
        <van-cell
          @click="showadd(citem)"
          v-for="(citem, cindex) in item.list"
          :key="cindex"
          :title="citem.name"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import detail from "../../components/city.json";
export default {
  name: "Address",
  data() {
    return {
      adddata: [],
    };
  },
  methods: {
    gohome() {
      this.$router.push("/home");
      this.$store.commit("showtabar");
    },
    showadd(citem) {
      localStorage.removeItem("addre");
      localStorage.setItem("addre", citem.name);
       this.$router.push("/home");
        this.$store.commit("showtabar");
    },
  },
  mounted() {
    this.adddata = detail.city;
  },
};
</script>
<style scoped>
#addrsee {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
}
.addhead {
  height: 2.8125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* .addhear input{
    display: block;
    
} */
.addhear {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 200;
}
.addhear img {
  width: 0.625rem;
  height: 0.9375rem;
  margin: 0 0.9375rem;
}
.addrig {
  margin-right: 0.9375rem;
}
.indexbar {
  margin-top: 2.8125rem;
}
</style>