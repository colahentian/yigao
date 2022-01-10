<template>
  <div id="tab-bar-item" @click="itemclick">
    <div v-if="!isActive">
      <slot name="item-icon"> </slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"> </slot>
    </div>
    <div :class="{ active: isActive }">
      <slot name="item-text"> </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBaritem",
  props: {
    path: String,
  },
  data() {
    return {};
  },
  computed: {
    //样式和隐藏的条件
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
  methods: {
    //点击重定向路由,抛出重定向错误
    itemclick() {
      this.$router.replace(this.path).catch((err) => console.log(1));
    },
  },
};
</script>
<style scoped>
#tab-bar-item {
  flex: 1;
  height: 3.0625rem;
  text-align: center;
  font-size: 11px;
}

#tab-bar-item img {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.375rem;
}
.active {
  color: red;
}
</style>
