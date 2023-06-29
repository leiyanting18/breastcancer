<template>
  <div class="userInfo">
    <div class="userInfoContent">
      <!-- 修改用户名 -->
      <div class="updateUsername">
        <span>修改用户名</span>
        <form role="form">
          <div class="form-group">
            <label class="control-label">旧用户名</label>
            <div>
              {{ this.username }}
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">新用户名</label>
            <div>
              <input type="text" class="form-control" placeholder="请输入用户名" v-model="newUsername">
            </div>
            <button type="button" class="btn btn-primary" @click="updateUsername">确认</button>
          </div>
          <div class="form-group">
            <label class="control-label"></label>
            <div class="usernameReg">
              用户名由1到10位的字母或数字组成！
            </div>
          </div>
        </form>
      </div>

      <!-- 修改密码 -->
      <div class="updateUsername">
        <span>修改密码</span>
        <form role="form">
          <!-- 旧密码 -->
          <div class="form-group">
            <label class="control-label">旧密码</label>
            <div>
              <input type="password" class="form-control" placeholder="请输入旧密码" v-model="oldPassword">
            </div>
          </div>
          <!-- 新密码 -->
          <div class="form-group">
            <label class=" control-label">新密码</label>
            <div>
              <input type="password" class="form-control" placeholder="请输入新密码" v-model="P1">
            </div>
          </div>
          <!-- 再次输入新密码 -->
          <div class="form-group">
            <label class=" control-label">再次输入新密码</label>
            <div>
              <input type="password" class="form-control" placeholder="请输入新密码" v-model="P2">
            </div>
            <button type="button" class="btn btn-primary" @click="updatePassword">确认</button>
          </div>
          <div class="form-group">
            <label class="control-label"></label>
            <div class="usernameReg">
              密码由6到16位的字母或数字组成！
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'userInfo',
  data () {
    return {
      newUsername: '',
      oldPassword: '',
      P1: '',
      P2: '',
    }
  },
  computed: {
    username () {
      return JSON.parse(localStorage.getItem('username')) || this.$store.state.username || ''
    },
    id () {
      return JSON.parse(localStorage.getItem('id')) || this.$store.state.id || ''
    }
  },
  methods: {
    // 根据id修改用户名
    updateUsername () {
      // 新用户名不得为空
      // 用户名校验
      var usernameReg = /^[a-zA-Z0-9]{1,10}$/
      if (!this.newUsername) {
        alert('请输入新用户名！')
      } else if (!usernameReg.test(this.newUsername)) {
        alert('新用户名不符合命名规则')
        this.newUsername = ''
      } else {
        request.post('/api/updateUsername', { username: this.newUsername, id: this.id }).then(res => {
          if (res.status === 1) {
            var msg = res.message
            alert(msg)
          } else if (res.status === 0) {
            alert('修改用户名成功！')
            // 重新保存username
            this.$store.commit('updateUsername', this.newUsername)
            localStorage.setItem('username', JSON.stringify(this.newUsername))
            // 清空输入框
            this.newUsername = ''
          }
        })
      }
    },
    // 根据id修改密码
    updatePassword () {
      request.post('/api/updatePassword', { oldPassword: this.oldPassword, P1: this.P1, P2: this.P2, id: this.id }).then(res => {
        if (res.status === 1) {
          var msg = res.message
          alert(msg)
          this.oldPassword = ''
          this.P1 = ''
          this.P2 = ''
        } else if (res.status === 0) {
          alert('修改密码成功!')
          this.oldPassword = ''
          this.P1 = ''
          this.P2 = ''
        }
      })
    }
  }
}
</script>

<style lang="less">
.userInfo {

  // 修改用户名
  .updateUsername {
    margin-bottom: 10px;
    margin-bottom: 30px;

    span {
      font-size: 18px;
    }

    form {
      font-size: 14px;
      margin-top: 10px;

      .form-group {
        height: 45px;
        display: flex;
        align-items: center;

        >label{
          width: 150px;
          text-align: center;
        }

        .usernameReg {
          font-size: 10px;
          font-weight: 300;
        }

        .btn {
          font-size: 12px;
          margin-left: 50px;
        }
      }
    }
  }
}
</style>