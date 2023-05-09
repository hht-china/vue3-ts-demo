<template>
  <!--  我在这删除了侧边栏自己的样式-->
  <!--   router   开启vue-router，默认是false，很重要的参数-->
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
  >
    <el-menu-item :index="item.path" v-for="item in menus" :key="item.path">
      <span>{{item.meta.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" >

import {defineComponent, ref} from "vue";

import {useRoute} from "vue-router";

export default defineComponent({
  // todo 这里其实就是 接口的参数，语法点：rops配置项
  props: ["memu_list"],
  setup (props) {
    let menus = ref(props.memu_list)
    //todo import router from "@/router/index" 我的router 和 useRoute 定义的有什么区别，为什么我的找不到path
    const route = useRoute()  // 活跃状态的路由
    return {
      menus,
      active_menu: route.path
    }
  }
})
</script>
