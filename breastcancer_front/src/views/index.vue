<template>
  <div class="index">
    <!-- 顶部 -->
    <div class="header">
      <Header></Header>
    </div>
    <div class="contentBox">
      <!-- 侧边栏 -->
      <div class="aside">
        <el-row class="tac">
          <el-col>
            <el-menu default-active="2">
              <el-menu-item index="1">
                <router-link to="/index/introduction">系统简介</router-link>
              </el-menu-item>
              <el-menu-item index="2">
                <router-link to="/index/data">数据查看</router-link>
              </el-menu-item>
              <el-menu-item index="3">
                <router-link to="/index/aprioriResult">关联分析结果</router-link>
              </el-menu-item>
              <el-menu-item index="4">
                  <router-link to="/index/predict">数据预测</router-link>
                </el-menu-item>
                <el-menu-item index="5">
                    <router-link to="/index/predictHistory">预测历史记录</router-link>
                  </el-menu-item>
              <el-menu-item index="6" v-if="this.isAdmin == 0">
                <router-link to="/index/addData">新增数据</router-link>
              </el-menu-item>
              <el-menu-item index="7" v-if="this.isAdmin == 1">
                <router-link to="/index/auditData">数据审核</router-link>
              </el-menu-item>
              <el-menu-item index="8">
                <router-link to="/index/userInfo">个人信息管理</router-link>
              </el-menu-item>
              <el-menu-item index="9" v-if="this.isAdmin == 1">
                <router-link to="/index/userRight">用户管理</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- 主要内容 -->
      <div class="mainContent">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../component/Header.vue'
import Data from '../views/data.vue'
import Kmeans from '../component/kmeans.vue'
import Distant from '@/component/distant.vue'
import Frequency from '@/component/frequency.vue'
import UserInfo from '@/component/userInfo.vue'
import Right from '@/component/right.vue'

export default {
  components: {
    Header,
    Data,
    Kmeans,
    Distant,
    Frequency,
    UserInfo,
    Right,
  },
  created () {
    // 导航默认显示data页面，为了保持导航栏和页面一致，这里设置刷新后显示data页面
    this.$router.push('/index/data')
  },
  computed: {
    // 区分管理员和用户显示的导航
    isAdmin () {
      return localStorage.getItem('isAdmin') || this.$store.state.isAdmin || ''
    }
  }

}
</script>

<style lang="less">
.index {

  // 顶部
  .header {
    background-color: #a7c4cc;
    width: 100%;
    height: 90px;
    position: relative;
    top: 0;
    left: 0;
  }

  // 顶部之外的内容部分
  .contentBox {
    display: flex;

    // 侧边栏
    .aside {
      width: 20%;

      .el-menu {
        --el-menu-text-color: black;
        font-size: 16px;
        width: 100%;
        border-bottom: solid 1px var(--el-menu-border-color);
      }

      .el-menu-item {
        font-size: 16px;
        --el-menu-hover-bg-color: none;
        display: flex;
        align-items: center;
        justify-content: center;

        a {
          color: black;
          text-decoration: none;
        }
      }

      .el-menu-item.is-active {
        color: black;
        background-color: #a7c4cc;
      }
    }

    // 主要内容
    .mainContent {
      width: 100%;
      margin: 20px;
    }
  }
}</style>