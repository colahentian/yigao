<template>
  <div id="message" >
    <div class="messhear">
      <div class="messmar messda">
        <router-link to="/shoppcart">
          <img src="../../assets/img/yigao/首页/back@2x.png" />
        </router-link>
      </div>
      <div class="messda">留言</div>
      <div class="messmar" @click="messlogin">提交</div>
    </div>
  <div class="messcont">
      <img :src="messdata.image" />
      <div>
        <span> {{messdata.title}} </span><br />
        <span> {{messdata.price | money}} </span>
      </div>
    </div>
    <div class="messcont">
      <textarea
        cols="30"
        rows="10"
        placeholder="输入留言"
        v-model="message"
      />  
    </div>  
  </div>
</template>
<script>
//留言界面
export default {
  name: "Message",
  data() {
    return {};
  },
  methods:{
    messlogin() {     
      //提交事件,使用接口更改留言,和跳转页面
      this.$store.commit('messageadd')
      setTimeout(() => {
         this.$router.push('/shoppcart')  
      }, 150);     
    },    
  },
  computed:{
    message:{
      //拿出数据进行绑定
      get(){
        return this.$store.state.shoppcart.messagemodel
      },
      //使用vuex实时更改改变的留言
      set(value){
        this.$store.commit('messageup',value)
      }
    },
    //购物车用户所点击的商品数据
    messdata:function(){
      return this.$store.state.shoppcart.messagedata
    }
  },
  filters:{
    money(data){
      return "￥" +data
    }
  }
};
</script>
<style scoped>
#message {
  width: 100%;
  height:100%;
  font-size: 0.875rem;
  position: absolute;
  z-index: 50;
  background-color: #fff;
}
body {
  background-color: #fff;
}
.messda {
  font-size: 16px;
}
.messmar img {
  width: 0.625rem;
  height: 0.9375rem;
  margin-left: 0.1875rem;
}
.messhear {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid rgb(214, 214, 214);
}
.messmar {
  margin: 0.75rem;
}
.messcont {
  width: 85%;
  margin: 20px 7%;
  display: flex;
  align-items: center;
}
.messcont textarea {
  resize:none;
  width: 20rem;
  border: 1px solid rgb(214, 214, 214);
  font-size: 0.875rem;
  padding-left: 0.3125rem;
  padding-top: 0.3125rem;
}
.messcont img {
  width: 4.375rem;
  height: 4.375rem;
}
</style>
