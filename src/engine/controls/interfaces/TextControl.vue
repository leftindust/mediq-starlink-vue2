<template>
  <input
      :type="type || 'text'"
      :readonly="readonly"
      :value="value"
      @input="onChange($event)"
      @mousedown.stop
  />
</template>

<script>
export default {
  props: [
    "initial",
    "readonly",
    "emitter",
    "ikey",
    "type",
    "change",
    "getData",
    "putData",
  ],
  data() {
    return {
      value: undefined
    }
  },
  methods: {
    parse(value) {
      return this.type === "number" ? +value : value;
    },
    onChange(e) {
      this.value = this.parse(e.target.value);
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value);
        this.change(this.value);
      }
      this.emitter.trigger("process");
    },
  },
  mounted() {
    this.value = this.getData(this.ikey);
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
