<template>
  <div id="app">
    <router-view />
    <tabbar />
  </div>
</template>

<script>
import tabbar from "@/components/tabbar.vue";
export default {
  name: "App",
  components: {
    tabbar: tabbar
  }
};
</script>
