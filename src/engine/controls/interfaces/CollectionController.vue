<template>
  <f7-list inset class="no-margin">
    <f7-list-item :title="typeof x + index" v-for="(x, index) in filterCollection" v-bind:key="x"/>
  </f7-list>
</template>

<script lang="ts">

export default {
  props: [
    "emitter",
    "ikey",
    "collection",
    "getData",
  ],
  computed: {
    filterCollection: () => this.collection.slice(0, 5)
  },
};
</script>

<style>
select,
input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>
