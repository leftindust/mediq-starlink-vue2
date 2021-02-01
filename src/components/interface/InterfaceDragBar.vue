<template>
  <div class="dragbar"></div>
</template>

<script>
export default {
  name: "DragBar",
};
</script>

<style scoped>
.dragbar {
  -webkit-app-region: drag;
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  top: 0;
}
</style>

