<template>
  <f7-list class="no-margin" no-hairlines inset>
    <f7-list-input
      label="Select"
      type="select"
      placeholder="Please choose..."
      @input="onChange($event)"
    >
      <option
        v-for="selection in selections"
        v-bind:key="selection"
        :value="selection"
        :selected="selection == value"
      >
        {{ selection }}
      </option>
    </f7-list-input>
  </f7-list>
</template>

<script>
export default {
  props: ["readonly", "emitter", "ikey", "getData", "putData", "selections", "change"],
  data() {
    return {
      value: this.selections[0],
    };
  },
  methods: {
    onChange(e) {
      this.value = e.target.value;
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
