<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
<!--    这个地方故意留出位置-->
    <el-menu-item index="0"> header </el-menu-item>
    <div class="flex-grow" />
    <span style="line-height: 58px;margin-right: 10px;">
      <el-popconfirm title="确定要退出?"
                     confirmButtonText="退出"
                     cancelButtonText="取消"
                     @confirm="handleExit">
        <template #reference>
          <el-button type="primary" link>
            退出登录
          </el-button>
        </template>
      </el-popconfirm>
    </span>
  </el-menu>
</template>

<script lang="ts" setup>

import router from "@/router/index";

const handleExit = () => {
  localStorage.removeItem("token")
  router.push("/login")
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
