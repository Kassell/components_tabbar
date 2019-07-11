## 前言

对于vue-router的使用，可以说大部分的人只是停留在跳转，参数接收，那么可不可以用router做一些有趣的东西呢，当然是有啊，今天我就一起来学习一下 ~~唱,跳,rap，来打篮球~~ 利用路由的元信息meta，生成一个类似微信小程序tabbar的导航栏

好处：解放双手可以不用在一个个配置tabbar页面了，只需要在路由里按照要求格式写，即可生成
坏处：暂时还没有发现有啥坏处，有不足的还望指教

###参考文章

参考：[vue-admin-template](https://juejin.im/post/595b4d776fb9a06bbe7dba56#heading-3)

## 效果预览

国际惯例，先来张效果图

![](https://user-gold-cdn.xitu.io/2019/7/11/16bdec1a36b1a5e2?w=401&h=677&f=gif&s=16800)

项目地址：[项目地址](https://github.com/Kassell/components_tabbar)



## 效果实现

### 1.配置路由

我们是基于router的元信息meta信息来实现的，那么我们第一步要做的事情当然是配置路由啊

分析一下，实现一个tabbar需要配置那些东西？一个生成tabbar的依据，一个标题，一个选中时候的图片，一个未选中的默认图片，一共四个

所以我们的meta的结构如下
```
meta:{
    tabbar: true,                                           //判断依据
    title: "tab",                                           //标题
    default_icon: require("../assets/default.svg"),         //默认图标
    active_icon: require("../assets/active.svg")            //选中图标
    }
```
给每个tabbar页面的路由都添加一个上面的meta对象

### 2.组件编写

我们的路由已经配置完成了，那么就进入喜闻乐见的组件编写了，先上代码

```
<template>
    <!-- 模板部分比较简单，样式大家可以根据自己的需求做一些调整 -->
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
      tab_active: "home",       //默认选中的路由的name
      componnents_show: true,   //控制组件显示或者隐藏
      tabbar: []                //渲染tabbar的数组
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
    //监听路由变化，来更新tabbar数组，同时判断是否跳转到tabbar页面，是则显示tabbar，否则不显示
    $route(to, from) {
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

```

### 3.引入和使用

将我们的组件引入到app.vue中去


```
<template>
  <div id="app">
    <router-view />
    <tabBar />      //在这里输入
  </div>
</template>

<script>
import tabbar from "@/components/tabbar.vue";          //引入组件
export default {
  name: "App",
  components: {     
    'tabBar': tabbar 
  }
};
</script>
```