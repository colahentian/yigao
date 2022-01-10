<template>
  <div id="tab-bar">
    <slot> </slot>
  </div>
</template>
<script>
export default {
  name: "TabBar",
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  background-color: white;
  border-top: 1px solid rgb(213, 213, 213);
}
</style>
