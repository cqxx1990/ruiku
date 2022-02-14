<template>
  <div class="navbar flex_row_center bg_light">
    <div class="navleft">
      <img
        class="back"
        v-if="!disableBack"
        @click="navBack"
        :src="icon || defaultIcon"
      />
    </div>
    <span class="title flex_center">{{ title }}</span>
    <div class="navright">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data(){ return { defaultIcon: require("./img/nav_back.png") }},
  props: ["icon", "title", "beforeNaviBack", "disableBack"],
  methods: {
    navBack() {
      if (this.beforeNaviBack) {
        if (this.beforeNaviBack()) this.$router.pop();
      } else {
        this.$router.pop();
      }
    },
  },
};
</script>

<style lang="scss">
.navbar {
  height: 0.44rem;
  z-index: 1;
  .navleft {
    width: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .navright {
    width: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .back {
    width: 0.26rem;
    height: 0.26rem;
    padding: 0.05rem;
  }
  .title {
    font-size: 0.16rem;
    font-weight: 400;
    color: #fff;
    flex: 1;
  }
  .menu {
    width: 0.26rem;
    height: 0.26rem;
    padding: 0.05rem;
    > img {
      width: 0.26rem;
      height: 0.26rem;
      display: block;
    }
  }
}
</style>
