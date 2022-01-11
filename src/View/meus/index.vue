<template>
    <el-row class="tac">
        <el-col :span="3" class="ment">
            <h5 style="color: white; text-align: center; font-size: 20px; margin: 10px auto">站点导航</h5>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item :index="index + ''" v-for="(item, index) in menut" :key="index" @click.native="getRout(item.path)">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="21">
            <el-row style="width: 100%; height: 57px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); text-align: right">
                {{ username }}<el-button @click="unLoging">退出登录</el-button>
            </el-row>
            <el-row style="background-color: #F3F5F8; height: calc(100vh - 57px);">
                <router-view />
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import db from "@/utils/localstorage";
 export default {
      data() {
          return {
              menut: [],
              username: db.get('USER').username
          }
      },
      mounted() {
          console.log(this.$router.options)
              this.menut = this.$router.options.routes[2].children
      },
      methods: {
          handleOpen(key, keyPath) {
              console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
              console.log(key, keyPath);
          },
          getRout(path) {
              this.$router.push(path)
          },
          unLoging() {
              db.clear()
              window.location.reload()
          },
      }
 }
</script>

<style scoped>
    .tac {
        height: 100vh;
    }
    .ment {
        height: 100%; background-color: #2c3e50
    }
</style>
