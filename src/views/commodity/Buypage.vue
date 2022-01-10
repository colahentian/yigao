<template>
  <div id="Buypage">
    <div class="mask" v-show="$store.state.showtw" @click="buyshowfal()"></div>
    <transition name="slide">
      <div id="buy-white" v-show="$store.state.showtw">
        <div class="buyimg">
          <img :src="buyimgs" class="buyimgon" />
          <div class="buywen">
            <div></div>
            <div class="buywenzi">
              <div></div>
              <div class="buycored">{{ price | moeny }}</div>
              <div>请选择规格参数</div>
              <div></div>
            </div>
          </div>
          <div @click="buyshowfal">
            <img
              src="../../assets/img/yigao/我的/fou@2x.png"
              class="buyimgtw"
            />
          </div>
        </div>
        <div class="buybody">
          <div v-for="(item, key, inx) in buydatathre" class="buybodzi">
            <p class="buyml">{{ key }}</p>
            <div class="buyflex">
              <div
                v-for="(i, index) in item"
                class="buydiv buylong buyml"
                @click="buytrans(inx, index)"
                :class="{ buybagre: index === buyischeck[inx] }"
              >
                {{ i }}
              </div>
            </div>
          </div>
          <div class="buybodzi">
            <p>数量</p>
            <div class="buybar">
              <div @click="buynumrmov">
                <img
                  src="../../assets/img/yigao/购物车/dibtn@2x.png"
                  class="buybarimgon"
                />
              </div>
              <div class="buybarwid">
                <input
                  type="text"
                  v-model="buynum"
                  style="outline: none"
                  maxlength="4"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  @blur="buyjudge"
                />
              </div>
              <div @click="buynumadd">
                <img
                  src="../../assets/img/yigao/购物车/jia@2x.png"
                  class="buybarimgtw"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="buybagred" @click="buycartdata">确定</div>
      </div>
    </transition>
  </div>
</template>
<script>
//商品规格组件
//页面数据请求,加入购物车接口
import { commodata, commaddshoppcart } from "@/api/commodity.js";
//弹窗组件
import { Toast } from "vant";
export default {
  name: "Buypage",
  data() {
    return {
      buynum: 1, //最终购买数量
      buyimgs: "", //商品图片
      buyid: "", //由三个变量临时拼接的index
      skuId: "", //根据用户点击变化的id，方便传参
      price: "", //根据用户点击变化的价格
      buydataone: [], //skus数组(判断条件和数据)
      buydatathre: [], //页面渲染数据
      buyischeck: [], //控制参数变色,和确定下标的数组
      buyleng: "", //商品规格的数量
    };
  },
  filters: {
    moeny(data) {
      return "￥" + data;
    },
  },
  methods: {
    buytrans(inx, index) {
      //改变商品规格变色条件
      this.buyischeck[inx] = index;
      //判断商品规格数量是否为1
      if (this.buyleng > 1) {
        //如果商品数量为1，拼接下标
        let indexd = "";
        this.buyischeck.forEach((item) => {
          indexd += item + "_";
        });
        //获取下标字符串去掉最后三位的长度
        let buyleng = indexd.length - 3;
        //最后一个商品的下标
        let slilef = indexd.slice(buyleng);
        //前部分所有商品下标
        let slirig = indexd.substring(0, buyleng);
        //最终所有商品的下标
        let inde = slilef + slirig;
        //去掉第一位的"_"
        this.buyid = inde.substr(1);
      } else {
        //如果商品规格数量为1，直接拿出下标
        this.buyid = this.buyischeck[0];
      }
      //进行比对,找出当前所点击商品规格的价格
      for (let index of this.buydataone.keys()) {
        let b = this.buydataone[index].indexes;
        if (this.buyid == b) {
          this.price = this.buydataone[index].price;
          this.buyimgs = this.buydataone[index].images;
        }
      }
    },
    //隐式转换,把商品数量转换为数值型
    buynumadd() {
      let num = this.buynum - 0;
      this.buynum = num += 1;
    },
    //如果商品数量为1不能减少
    buynumrmov() {
      if (this.buynum >= 2) {
        this.buynum -= 1;
      }
    },
    //加入购物车事件
    buycartdata() {
      //关闭商品规格弹出层
      this.$store.commit("addbuyCart");
      //判断商品规格数量是否为1
      if (this.buyleng > 1) {
        //如果商品数量为1，拼接下标
        let indexd = "";
        this.buyischeck.forEach((item) => {
          indexd += item + "_";
        });
        //获取下标字符串去掉最后三位的长度
        let buyleng = indexd.length - 3;
        //最后一个商品的下标
        let slilef = indexd.slice(buyleng);
        //前部分所有商品下标
        let slirig = indexd.substring(0, buyleng);
        //最终所有商品的下标
        let inde = slilef + slirig;
        //去掉第一位的"_"
        this.buyid = inde.substr(1);
      } else {
        //如果商品规格数量为1，直接拿出下标
        this.buyid = this.buyischeck[0];
      }
      //循环找出商品id
      for (let index of this.buydataone.keys()) {
        //找出对应下标的商品id
        let b = this.buydataone[index].indexes;
        if (this.buyid == b) {
          //拿到对应的商品id
          let d = this.buydataone[index].id;
          //请求后端接口,发送商品id和num
          commaddshoppcart(d, this.buynum)
            .then((response) => {
              //提示购买成功弹窗;
              Toast.success({
                message: "加入购物车成功",
                duration: 1300,
              });
            })
            .catch(function (error) {
              Toast.fail({
                message: "加入购物车失败",
                duration: 1300,
              });
            });
        }
      }
    },

    //改变商品弹出层的条件
    buyshowfal() {
      this.$store.commit("commshow");
    },
    //数字输入框失去焦点事件,空值时为1
    buyjudge() {
      if (this.buynum == null || this.buynum == "") {
        this.buynum = 1;
      }
    },
  },

  mounted() {
    //用首页点击商品id获取接口数据
    let spuid = this.$store.state.commoskuid;
    commodata(spuid)
      .then((response) => {
        //拿出页面渲染数据,条件所在数据
        let data = response.data.data;
        this.buydataone = data.skus;
        //获取页面渲染数据
        let temp = []; //其他数据
        let transit = []; //第一条数据
        //将接口数据转为数组
        let entr = Object.entries(data.skuSaleParams);
        //遍历数组，拿出第一条数据，其他加入temp
        entr.forEach((item, index) => {
          if (index != 0) {
            temp.push(item);
          } else {
            transit = item;
          }
        });
        //把第一条数据放到最后
        temp.push(transit);
        //把数组转为对象数据
        let finall = Object.fromEntries(temp);
        //把数据传给页面渲染数组
        this.buydatathre = finall;
        //获取数据对象的长度
        this.buyleng = Object.keys(finall).length;
        //根据数据的长度，来增加判断颜色和下标的条件
        for (let i = 0; i < this.buyleng; i++) {
          this.buyischeck[i] = 0;
        }
        //判断商品规格数量是否为1
        if (this.buyleng > 1) {
          //如果商品数量为1，循环拼接下标
          let indexd = "";
          this.buyischeck.forEach((item) => {
            indexd += item + "_";
          });
          //获取下标字符串去掉最后三位的长度
          let buylen = indexd.length - 3;
          //最后一个商品的下标
          let slilef = indexd.slice(buylen);
          //前部分所有商品下标
          let slirig = indexd.substring(0, buylen);
          //最终所有商品的下标
          let inde = slilef + slirig;
          //去掉第一位的"_"
          this.buyid = inde.substr(1);
        } else {
          //如果商品规格数量为1，直接拿出下标
          this.buyid = this.buyischeck[0];
        }
        //循环进行比对,如果indexes值相等,返回该商品的价格
        for (let item of data.skus.values()) {
          if (item.indexes == this.buyid) {
            this.price = item.price;
            this.buyimgs = item.images;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style>
@import "../../assets/css/buypage.css";
</style>
