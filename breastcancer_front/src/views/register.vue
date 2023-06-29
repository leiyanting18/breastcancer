<template>
    <div class="registerView">
        <!-- 背景图片 -->
        <img src="../assets/background.jpg" class="background">

        <!-- 表单 -->
        <div class="formBox">
            <span class="title">欢迎注册乳腺癌中医辅助治疗系统</span>
            <form class="form-horizontal" role="form">
                <!-- 用户名 -->
                <div class="form-group">
                    <label for="username">用户名</label>
                    <div>
                        <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model.trim="username">
                    </div>
                </div>
                <!-- 用户名命名规则 -->
                <div class="regBox">
                    <label></label>
                    <span class="reg">用户名由1到10位的字母或数字组成！</span>
                </div>
                <!-- 密码 -->
                <div class="form-group">
                    <label for="password">密码</label>
                    <div>
                        <input type="password" class="form-control" id="password" placeholder="请输入密码"
                            v-model.trim="password1">
                    </div>
                </div>
                <!-- 密码的命名规则 -->
                <div class="regBox">
                    <label></label>
                    <span class="reg">密码由6到16位的字母或数字组成！</span>
                </div>
                <!-- 再次输入的密码 -->
                <div class="form-group">
                    <label for="password">再次输入密码</label>
                    <div>
                        <input type="password" class="form-control" id="password" placeholder="请输入密码"
                            v-model.trim="password2">
                    </div>
                </div>
            </form>
            <div class="button">
                <button type="button" class="btn btn-primary" @click="register">注册</button>
                <!-- <button type="button" class="btn btn-primary" @click="login">去登录</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import request from '../request/request'

export default {
    name: 'register',
    data () {
        return {
            username: '',
            password1: '',
            password2: '',
        }
    },
    methods: {
        // 点击注册按钮
        register () {
            // 用户名和密码的校验
            // 用户名——1-6位的字母或数字
            // 密码——6-16位的字母或数字
            var usernameReg = /^[a-zA-Z0-9]{1,10}$/
            var passwordReg = /^[a-zA-Z0-9]{6,16}$/
            // 用户名、密码不为空
            if (!this.username || !this.password1 || !this.password2) {
                alert('用户名或密码不得为空！')
            } else if (this.password1 !== this.password2) {
                // 两次输入的密码要一致
                // 重新输入两个密码
                alert('两次输入的密码不一致！')
                this.password1 = ''
                this.password2 = ''
            } else if (!usernameReg.test(this.username) || !passwordReg.test(this.password1)) {
                alert('用户名或密码不符合命名规则！');
                this.username = ''
                this.password1 = ''
                this.password2 = ''
            } else {
                request.post('/api/registerUser', { username: this.username, password1: this.password1, password2: this.password2 }).then(res => {
                    if (res.status === 1) {
                        var msg = res.message
                        alert(msg)
                    } else if (res.status === 0) {
                        alert('注册成功！')
                        // 清空表单
                        this.username = ''
                        this.password1 = ''
                        this.password2 = ''
                        // 跳转到登录页面
                        this.$router.push('/')
                    }
                })
            }

        },
        // 点击登录按钮
        // login () {
        //     this.$router.push('/')
        // }
    }
}
</script>

<style lang="less">
.registerView {

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
            width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .form-group {
                display: flex;
                align-items: center;
                height: 60px;


            }

            label {
                width: 120px;
                text-align: center;
            }

            .reg {
                font-size: 8px;
                margin-left: 5px;
                font-weight: 300;
            }
        }

        .button {
            display: flex;
            margin-top: 30px;
            
            .btn{
                margin-left: 100px;
            }
        }
    }


}
</style>