<template>
  <div>
    <div v-if="!readonly">
      <f7-stepper
        fill
        raised
        :value="value"
        :min="0"
        :step="1"
        @stepper:change="onChange"
        :autorepeat="true"
        :wraps="true"
        :manual-input-mode="true"
        :decimal-point="0"
        @mousedown.stop
      ></f7-stepper>
    </div>
    <div v-else>
      <h1 class="text-align-center">{{ !isNaN(value) ? value : "?" }}</h1>
    </div>
  </div>
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
      value: this.initial || 0,
    };
  },
  methods: {
    parse(value) {
      return +value;
    },
    onChange(value) {
      this.value = value;
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value);
      }
      this.emitter.trigger("process");
    },
  },
  mounted() {
    this.value = this.getData(this.ikey);
  },
};
</script>
