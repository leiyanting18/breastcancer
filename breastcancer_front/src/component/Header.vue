<template>
    <div class="header">
        <h1>欢迎使用乳腺癌中医辅助治疗系统</h1>
        <div class="right">
            <span>{{ this.username }}</span>
            <button type="button" class="btn btn-primary" @click="logout">退出</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'header',
    // 即使刷新网页也不会丢失数据
    computed: {
        username () {
            return JSON.parse(localStorage.getItem('username')) || this.$store.state.username || ''
        }
    },
    methods: {
        // 点击退出按钮
        logout () {
            // 修改vuex里面的数据
            this.$store.commit('updateUsername', '')
            this.$store.commit('updateId', '')
            // this.$store.commit('updateToken', '')
            this.$store.commit('updateIsAdmin', '')
            // 清除本地存储得数据
            localStorage.removeItem('username')
            localStorage.removeItem('id')
            localStorage.removeItem('isAdmin')
            // 跳转到登录页面
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less">
.header {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        width: 70%;
    }

    .right {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}
</style>