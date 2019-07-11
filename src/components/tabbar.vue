<template>
    <div class="tab_container" v-if="componnents_show&&tabbar.length>0">
    <div class="item_box" @click="toPath(item.name)" v-for="item in tabbar" :key="item.name">
      <img :src="item.active_icon" alt class="icon" v-if="tab_active==item.name" />
      <img :src="item.default_icon" alt class="icon" v-else />
      <div class="tab_name" :class="tab_active==item.name?'color_active':''">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      tab_active: "home",
      componnents_show: true,
      tabbar: []
    };
  },
  methods: {
    /**页面跳转
     * @param {string} e 对应路由信息的name
     */
    toPath(e) {
      this.$router.replace({ name: e }); //路由跳转
    }
  },
  watch: {
    //监听路由变化，来更新tabbar渲染数组，同时判断是否跳转到tabbar页面，是则显示tabbar，否则不显示
    $route(to, from) {
      console.log(from);
      let array = []; 
      let is_tabbar = false;
      this.$router.options.routes.forEach(item => {
        if (item.meta && item.meta.tabbar) {
          let object = {
            name: item.name,
            ...item.meta
          };
          if (to.name == item.name) {
            is_tabbar = true;
          }
          array.push(object);
        }
      });

      this.tabbar = array;
      if (is_tabbar) {
        this.componnents_show = true;
        this.tab_active = to.name;
      } else {
        this.componnents_show = false;
      }
    }
  }
};
</script>

<style>

.tab_container {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 50px;
  border-top: 1px solid rgba(243, 243, 243, 1);
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.item_box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 24px;
  height: 24px;
}
.tab_name {
  font-size: 11px;
  text-align: center;
  line-height: 16px;
  font-weight: 400;
  color: rgba(168, 168, 168, 1);
}
.color_active {
  color: RGBA(77,176,228);
}
</style>
