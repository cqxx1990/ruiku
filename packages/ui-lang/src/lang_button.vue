<template>
  <div class="lang_btn flex_row_center" @click="$emit('tap')">
    <span class="lang-btn__name">{{ name }}</span>
    <img class="lang-btn__img" :src="icon" />
  </div>
</template>

<script>
export default {
  props: ["name", "icon"]
};
</script>

<style lang="scss" scoped>
.lang-btn__name {
  color: rgba($color: #fff, $alpha: 0.65);
  font-size: 0.16rem;
  flex: 1;
  text-align: right;
}
.lang-btn__img {
  width: 0.24rem;
  height: 0.24rem;
  margin-left: 0.08rem;
}
</style>
