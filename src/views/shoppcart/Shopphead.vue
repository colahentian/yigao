<template>
  <div class="carhe" id="shopphead">
    <div class="shopplef" v-show="!shoppheadshow" @click="shopheadshow">
      取消
    </div>
    <div>
      购物车
      <span v-if="shopplength != 0"
        >({{ shopplength }})</span
      >
    </div>
    <div class="shopprig" v-show="shoppheadshow" @click="shopheadshow">
      编辑
    </div>
    <div class="shopprig" v-show="!shoppheadshow" @click="shoppdeldata">
      删除
    </div>
  </div>
</template>
<script>
//购物车头部组件
export default {
  name: "Shopphead",
  data() {
    return {
      //删除按钮的隐藏状态
      shoppheadshow: true,
      shopplength:'',
    };
  },
  methods: {
    shopheadshow() {
      //编辑按钮改变状态
      this.shoppheadshow = !this.shoppheadshow;
    },
    //测试(删除商品)
    shoppdeldata() {
      this.$store.commit("delmember");
      this.$forceUpdate();
      this.$store.commit("shopprefresh");
      //购物车为空,空购物车出现,删除隐藏
      if ( this.shopplength== 0) {
        this.shoppheadshow = true;
      }
    },
  },
  computed:{
    shoppLength:function(){
      this.shopplength=this.$store.state.shoppcart.shocartdata.length
    }
  }
};
</script>
