<template>
    <!-- 用户管理页面 -->
    
    <div class="rightView">
        <van-tabs>
            <van-tab title="用户数据">
                <userData />
            </van-tab>
            <van-tab title="管理员数据">
                <adminData />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import userData from '../component/userData.vue'
import adminData from '../component/adminData.vue'

export default {
    name: 'data',
    components: {
        userData,
        adminData,
    }
}
</script>

<style lang="less">
.rightView {
    .van-tab{
        font-size: 16px;
        height: 30px;
    }
    .van-tabs__nav--line {
        height: 80%;
        width: 100%;
    }
    .van-tabs__line{
        width: 50%;
        height: 5px;
        background-color: #a7c4cc;
    }
     .van-tabs__wrap{
        margin-bottom: 20px;
    }
}
</style>