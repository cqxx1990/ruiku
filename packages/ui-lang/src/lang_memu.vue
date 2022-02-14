<template>
  <div class="tips" v-if="show" @click="$emit('update:show', false)">
    <div class="menubox" :style="{ right, top }" @click.stop="">
      <div class="menu">
        <template v-for="(item, i) in list">
          <span v-bind:key="i" v-if="i > 0"></span>
          <div
            :class="selected == i ? 'select' : ''"
            @click="onTapMenu(i)" v-bind:key="item.k"
          >
            <img :src="item.img" /><span>{{ item.n }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ["lang","storeKey","show", "right", "top"],
  data() {
    return { list: this.lang.LangList, selected: 1 };
  },
  mounted() {
    this.selected = this.lang.LangList.indexOf(this.lang.current());
  },
  methods: {
    onTapMenu(index) {
      if (index == this.selected) return;
      localStorage.setItem(this.storeKey,this.list[index].k)
      this.selected = index;
      this.lang.setLanguage(this.list[index].k);
      location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.tips {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  z-index: 1000;
  .menubox {
    width: 0.86rem;
    position: absolute;
    padding: 0 0.05rem;
    background: #21457f;
    border-radius: 0.1rem;
    .menu {
      > div {
        width: 100%;
        height: 0.32rem;
        font-size: 0.14rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        opacity: 0.5;
        > img {
          width: 0.18rem;
          height: 0.18rem;
          margin-right: 0.05rem;
          margin-left: 0.03rem;
        }
        > span {
          flex: 1;
          text-align: center;
        }
        &.select {
          opacity: 1 !important;
        }
      }
      > span {
        display: block;
        height: 0.01rem;
        display: block;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .menu:before {
      border-bottom: 0.05rem solid #21457f;
      width: 0;
      height: 0;
      border-left: 0.05rem solid transparent;
      border-right: 0.05rem solid transparent;
      content: "";
      position: absolute;
      left: 75%;
      margin-left: -0.05rem;
      top: -0.05rem;
    }
  }
}
</style>
