<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="off" label-position="left">
            <div class="title-container">
                <h3 class="title">
                    登 录
                </h3>
            </div>
            <span v-if="login.type === 'up'">
        <el-form-item prop="username">
          <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="账号"
                  prefix-icon="el-icon-user"
                  name="username"
                  type="text"
                  autocomplete="off"
                  @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
                  ref="password"
                  v-model="loginForm.password"
                  prefix-icon="el-icon-key"
                  type="password"
                  placeholder="密码"
                  name="password"
                  autocomplete="off"
                  :show-password="true"
                  @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:14px;" @click.native.prevent="handleLogin">
          立即登录
        </el-button>
      </span>
        </el-form>
    </div>
</template>

<script>
import {progress} from '@/network/mock'
import db from '@/utils/localstorage.js'
    export default {
        name: 'Login',
        data() {
            return {
                login: {
                    type: 'up'
                },
                loginForm: {
                    username: '',
                    password: '',
                },
                loading: false
            }
            },
        methods: {
            handleLogin() {
                let that = this
                progress('/login', this.loginForm).then(res => {
                    if(res.status == 200) {
                        this.$message.success('登录成功')
                        db.save('TOKEN', res.data.id)
                        db.save('USER', res.data)
                        that.$router.push('/')
                    }
                })
            }
        }
        }
</script>
<style lang="less">
    @import "login";
</style>
<style lang="less" scoped>
    @import "login-scoped";
</style>
