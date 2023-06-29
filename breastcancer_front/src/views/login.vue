<template>
  <div class="homeView">
    <!-- 背景图片 -->
    <img src="../assets/background.jpg" class="background">

    <!-- 表单 -->
    <div class="formBox">
      <span class="title">欢迎使用乳腺癌中医辅助治疗系统</span>
      <form class="form-horizontal" role="form">
        <!-- 用户名 -->
        <div class="form-group">
          <label for="username">用户名</label>
          <div>
            <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model.trim="username">
          </div>
        </div>
        <!-- 密码 -->
        <div class="form-group">
          <label for="password">密码</label>
          <div>
            <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model.trim="password">
          </div>
        </div>
      </form>
      <!-- 按钮不可以放在表单中 -->
      <div class="button">
        <button type="button" class="btn btn-primary" @click="login">登录</button>
        <button type="button" class="btn btn-primary" @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../request/request'
export default {
  name: 'homeView',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 点击登录按钮
    login () {
      // 用户名和密码不得为空
      if (!this.username || !this.password) {
        alert('用户名或密码不得为空')
      } else {
        request.post('/api/loginUser', { username: this.username, password: this.password }).then(res => {
          if (res.status === 1) {
            // 不可以直接alert(res.message)，res.message是对象格式
            // 而alert只能显示字符串格式
            var msg = res.message
            alert(msg)
            this.username = ''
            this.password = ''
          } else if (res.status === 0) {
            // 登录成功，跳转到首页
            this.$router.push('/index')
            this.username = ''
            this.password = ''
            // 用户信息保存到store中
            this.$store.commit('updateUsername', res.data.username)
            localStorage.setItem("username", JSON.stringify(res.data.username));
            this.$store.commit('updateId', res.data.id)
            localStorage.setItem("id", JSON.stringify(res.data.id));
            // this.$store.commit('updateToken', res.token)
            this.$store.commit('updateIsAdmin', res.data.isAdmin)
            // localStorage.setItem("TOKEN", JSON.stringify(res.token));
            // 问题——页面刷新，管理员登录失效，用户管理页面出现错误
            // 本地存储isAdmin，保证刷新时用户管理页面不出错
            localStorage.setItem("isAdmin", JSON.stringify(res.data.isAdmin));
          }
        })
      }
    },
    // 点击注册按钮
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less">
.homeView {

  // 背景图片
  .background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -999;
    height: 100%;
    width: 100%;
  }

  // 表单
  .formBox {
    width: 800px;
    height: 300px;
    margin: 15% auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 30px;
      font-weight: 600;
    }

    .form-horizontal {
      margin-top: 10px;

      .form-group {
        display: flex;
        align-items: center;
        height: 60px;

        label {
          width: 70px;
        }
      }
    }
  }

  // 按钮不可以放在表单中
  .button {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 30px;
  }

}
</style>