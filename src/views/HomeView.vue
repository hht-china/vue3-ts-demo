<template>
  <div class="common-layout">
    <el-container>
      <el-header><TopNav/></el-header>
      <el-container>
        <!--LeftNav改造后 需要在这个地方传参,传参后再js里定义变量和赋值-->
        <el-aside width="200px"><LeftNav :memu_list="need_list"/></el-aside>
        <el-main>
<!--          设置路由出口-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopNav from '@/components/TopNav.vue'
import LeftNav from '@/components/LeftNav.vue'
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'HomeView',
  components: {
    TopNav,
    LeftNav
  },
  setup () {
    const router = useRouter()
    // todo 此处是通过router拿到你配置的route信息
    const need_list = router.getRoutes().filter(v => v.meta.isShow);
    console.log(need_list)
    return {need_list}
  }
});
</script>
