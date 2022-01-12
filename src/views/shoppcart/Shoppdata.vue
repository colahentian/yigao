<template>
  <div id="shoppdata">
    <div
      class="shoppbai"
      v-for="(item, index) in this.$store.state.shocartdata"
      :key="index"
    >
      <div class="shopphear">
        <div class="cartbox">
          <div class="shoppradio" @click="datanull(index)">
            <img
              src="../../assets/img/yigao/购物车/gou@2x.png"
              v-show="item.check"
            />
          </div>
        </div>
        {{ item.storeName }}
      </div>
      <div class="shoppbod">
        <div class="shoppradio" @click="datanull(index)">
          <img
            src="../../assets/img/yigao/购物车/gou@2x.png"
            v-show="item.check"
          />
        </div>
        <img :src="item.image" class="shoppbodimg" />
        <div class="shoppwen">
          <div>{{ item.title }}</div>
          <div class="shoppdatasize" v-for="a in item.skuAttr">
            {{ a | shoppdatadele }}
          </div>
          <div>
            <div class="shoppclred">{{ item.price | money }}</div>
            <span class="shoppchen">{{ item.count | take }}</span>
          </div>
        </div>
      </div>
      <div class="shoppbar">
        <div class="shoppliu">{{ item.notes | shoppmessage }}</div>
        <div class="shoppr" @click="shoppbuy(index)">
          <router-link to="message">
            {{ item.notes | shoppmesnull }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//购物车商品数据组件
//请求购物车数据
import { selectshoppcart } from "@/api/shoppcart.js";
export default {
  name: "Shoppdata",
  data() {
    return {};
  },
  methods: {
    //单按钮点击事件
    datanull(index) {
      this.$store.commit("shoppcheck", index);
    },
    //留言点击事件
    shoppbuy(index) {
      //把下标传到vuex,方便渲染留言页数据
      this.$store.commit("messnull", index);
    },
  },
  created() {
    //获取页面渲染数据
    selectshoppcart()
      .then((res) => {
        //把页面渲染数据翻转
        console.log(res);
        let data = res.data.data.reverse();
        //把商品参数数据传到vuex
        this.$store.commit("shoppadddata", data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //过滤器
  filters: {
    //商品规格参数去掉前三位
    shoppdatadele(data) {
      return data.slice(3);
    },
    //留言如果不为空进行留言拼接
    shoppmessage(data) {
      if (data != "" && data != undefined) {
        return "留言:" + data;
      } else {
        return (data = "暂未编辑留言");
      }
    },
    //留言如果不为空则为修改
    shoppmesnull(data) {
      if (data != "" && data != undefined) {
        return (data = "修改");
      } else {
        return (data = "留言");
      }
    },
    //对价格和文字进行拼接
    money(data) {
      return "￥" + data;
    },
    take(data) {
      return "X" + data;
    },
  },
};
</script>
<style>
#shoppdata {
  background-color: rgb(241, 241, 241);
  width: 100%;
  height: 41.6875rem;
  overflow: scroll;
}
.shoppbai {
  background-color: #fff;
  margin: 0.59375rem 0;
}
.shoppradio {
  width: 1.3125rem;
  height: 1.3125rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 0.5625rem 0.4375rem 0.4375rem;
  border: 0.0625rem solid rgb(218, 218, 218);
}
.shoppradio img {
  width: 1.3125rem;
  height: 1.3125rem;
}
.shopphear {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 2.9375rem;
  border-bottom: 0.0625rem solid rgb(243, 243, 243);
}
.shoppbod {
  display: flex;
  align-items: center;
  margin: 0.625rem 0;
}
.shoppbodimg {
  height: 6.25rem;
  width: 6.1875rem;
}

.shoppbar {
  display: flex;
  height: 2.5rem;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-left: 10%;
  border-top: 0.0625rem solid rgb(243, 243, 243);
}
.shoppliu {
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.shoppbar a {
  text-decoration: none;
  color: black;
}

.shoppdatasize {
  font-size: 0.8125rem;
  height: 1.125rem;
  line-height: 1.125rem;
}

.shoppwen {
  width: 59%;
  position: relative;
  margin-left: 1.25rem;
}
.shoppchen {
  position: absolute;
  right: 0.625rem;
  bottom: 0.1875rem;
}
.shoppr {
  margin-right: 0.625rem;
}
</style>
