<template>
  <!-- 用户管理页面中、管理员数据页面 -->
  
  <div class="dataView">
    <!-- 查询管理员 -->
    <div class="searchData">
      <span>查询管理员</span>
      <div>
        <span>id：</span>
        <input type="text" v-model.trim="searchContent">
      </div>
      <button type="button" class="btn btn-primary" @click="searchById">查询</button>
    </div>

    <!-- 管理员数据展示 -->
    <div class="showData" v-if="showList">
      <div class="showData-top">
        <span>管理员列表</span>
        <div>（共{{ this.total }}条数据）</div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>编号</th>
            <th>id</th>
            <th>管理员名称</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.dataList" :key="index">
            <td>{{ (this.currentPage - 1) * 10 + index + 1 }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 展示查询结果 -->
    <div class="showData" v-else>
      <h6>管理员列表</h6>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>编号</th>
            <th>id</th>
            <th>管理员名称</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{{ this.resultList[0].id }}</td>
            <td>{{ this.resultList[0].username }}</td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- 分页插件 -->
    <van-pagination v-model="currentPage" :page-count="Math.ceil(total / 10)" mode="simple" :items-per-page="10"
      v-if="showList" />
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'data',
  data () {
    return {
      // 所有数据，为了获取total
      dataList: [],
      // 当前页数
      currentPage: 1,
      // 一共有多少条数据
      total: '',
      // 10条数据
      allData: [],
      // 要搜索的id
      searchContent: '',
      // true标识展示所有数据，false标识展示查询结果
      showList: true,
      // 查询结果
      resultList: [],
    }
  },
  created () {
    // 获取10条数据
    this.showData()
    // 获取total
    this.getAllData()
    // 展示所有数据列表和分页插件
    this.showList = true
  },
  // 数据源改变时触发
  updated () {
    // 重新获取total——因为会增加、修改、删除数据
    this.getAllData()
  },
  methods: {
    // 获取所有管理员信息，isAdmin=0
    // 获取total
    getAllData () {
      request.get('/api/getAdmin').then(res => {
        this.allData = res.data
        this.total = this.allData.length
      })
    },
    // 获取10条未被删除的管理员信息
    showData () {
      request.get('/api/adminInfo/' + (this.currentPage - 1) * 10).then(res => {
        if (res.status === 1) {
          console.log(res.message);
        } else if (res.status === 0) {
          this.dataList = res.data
        }
      })
    },
    // 根据id获取未被删除的管理员数据
    // 清空搜索框
    search (id) {
      request.get('/api/getAdminInfoById/' + id).then(res => {
        if (res.status === 1) {
          var msg = res.message
          alert(msg)
          this.searchContent = ''
          this.showList = true
        } else if (res.status === 0) {
          this.resultList = res.data
          this.searchContent = ''
        }
      })
    },
    // 点击查询按钮
    // 作用——动态切换全部数据列表和结果列表
    // 如果搜索内容为空，则显示所有数据列表
    // 如果不为空，则显示结果数列表，并且根据搜索内容获取对应数据
    searchById () {
      if (!this.searchContent) {
        this.showList = true
      } else {
        this.showList = false
        this.search(this.searchContent)
      }

    },
  },
  // 侦听器
  watch: {
    // currentPage发生变化，则重新加载数据以及更改total
    currentPage () {
      this.showData()
      this.getAllData()
    },
  }
}
</script>

<style lang="less">
.dataView {
  font-size: 14px;

  // 查询管理员数据
  .searchData {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    >span {
      font-size: 18px;
    }

    div {
      margin-left: 20px;
    }

    .btn {
      margin-left: 20px;
      font-size: 12px;
    }
  }

  // 管理员数据展示
  .showData-top {
    width: 100%;
    display: flex;
    align-items: center;

    >div {
      font-size: 12px;
    }

    .btn {
      margin-left: 20px;
      font-size: 12px;
    }
  }

  th {
    font-weight: 400;
    font-size: 12px;
  }

}
</style>