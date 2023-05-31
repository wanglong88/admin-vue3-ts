<template>
  <div class="common-layout wh100">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="logo" src="../assets/images/nav_logo.jpg" alt="">
          </el-col>
          <el-col :span="16">
            <h2 class="tc">伊欧科技管理系统</h2>
          </el-col>
          <el-col :span="4" align="right">
            <span class="quit-login" @click="exit">退出登录</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="route.path"
            text-color="#fff" @open="handleOpen" @close="handleClose" router>
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <el-icon><location /></el-icon>
              {{ item.meta.title }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

let list = router.getRoutes().filter(item => item.meta.isShow)


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const exit = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="less">
.logo {
  width: 72px;
  height: 72px;
}

.el-header {
  padding: 0;
  height: auto;
}

.el-row {
  background: #D3DCE6;
  padding: 0 20px;
}

h2,
.quit-login {
  height: 72px;
  line-height: 72px;
}


.el-aside {
  height: calc(100vh - 72px);
}
.el-menu {
  height: 100%;
}
.quit-login {
  cursor: pointer;
  &:hover {
    color: aqua;
  }
}
</style>
