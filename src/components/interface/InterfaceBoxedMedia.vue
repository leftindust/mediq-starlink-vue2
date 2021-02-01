<template>
  <div
    class="media-boxed"
    :class="{
      'media-circle': circle,
      [size]: size,
      [`bg-color-${color}`]: color,
      'media-center': center,
    }"
  >
    {{ text }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BoxedMedia",
  props: {
    text: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "gray",
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.media-boxed {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 45px;
  height: 45px;
  line-height: 45px;
  color: white;
  border-radius: 8px;
  user-select: none;
}

.media-circle {
  border-radius: 100% !important;
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
}

.tiny {
  width: 22px !important;
  max-width: 22px !important;
  height: 22px !important;
  max-height: 22px !important;

  line-height: 22px !important;
  font-size: 14px;
}

.small {
  width: 30px !important;
  max-width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
  font-size: 14px;
  font-weight: 500;
}

.large {
  width: 60px !important;
  max-width: 60px !important;
  height: 60px !important;
  line-height: 60px !important;
  font-size: 28px;
}

.xlarge {
  width: 90px !important;
  max-width: 90px !important;
  height: 90px !important;
  line-height: 90px !important;
  font-size: 40px;
}

.media-center {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
