<template>
  <!-- 管理员审核数据页面 -->

  <div class="auditData">
    <!-- 列表，显示status=1的数据 -->
    <ul>
      <li class="auditData-content" v-for="(item, index) in this.auditData" :key="index">
        <!-- 标题——用户的id，也就是belong-->
        <div class="auditData-top">
          提交者ID：{{ item.belong }}
        </div>
        <!-- 内容——6个证型系数、6个证型得分、操作（审核通过、审核不通过） -->
        <div class="auditData-main">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 50px;"></th>
                <th>肝气郁结证型</th>
                <th>热毒蕴结证型</th>
                <th>冲任失调证型</th>
                <th>气血两虚证型</th>
                <th>脾胃虚弱证型</th>
                <th>肝肾阴虚证型</th>
                <th>TNM分期</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>系数</td>
                <td>{{ item.gqyj }}</td>
                <td>{{ item.rdyj }}</td>
                <td>{{ item.crst }}</td>
                <td>{{ item.qxlx }}</td>
                <td>{{ item.pwxr }}</td>
                <td>{{ item.gsyx }}</td>
                <td>{{ item.TNM }}</td>
              </tr>
              <tr>
                <td style="width: 50px;">得分</td>
                <td>{{ item.gqyj * 40 }}</td>
                <td>{{ item.rdyj * 40 }}</td>
                <td>{{ item.crst * 40 }}</td>
                <td>{{ item.qxlx * 40 }}</td>
                <td>{{ item.pwxr * 40 }}</td>
                <td>{{ item.gsyx * 40 }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <!-- 审核通过、审核不通过按钮 -->
          <div class="btnGroup">
            <el-button type="success" text @click="auditSuccess(item.id)">通过</el-button>
            <el-button type="danger" text @click="auditFail(item.id)">不通过</el-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'auditData',
  data () {
    return {
      // status=1的全部数据
      auditData: [],
    }
  },
  methods: {
    // 获取status=1的数据
    getAuditData () {
      request.get('/api/getAllAudited').then(res => {
        if (res.status == 0) {
          this.auditData = res.data
        } else {
          console.log(res.message);
        }
      })
    },
    // 审核通过
    // 根据id将status设置为3
    // 将数据添加到bcdataset表中
    auditSuccess (id) {
      request.post('/api/auditSuccess', { id: id }).then(res => {
        if (res.status == 0) {
          request.post('/api/auditSuccessToBcdataset', { gqyj: res.data.gqyj, rdyj: res.data.rdyj, crst: res.data.crst, qxlx: res.data.qxlx, pwxr: res.data.pwxr, gsyx: res.data.gsyx,  belong: res.data.belong }).then(res => {
            console.log(res.message);
          })
        } else {
          var msg = res.message
          alert(msg)
        }
      })
    },
    // 审核不通过
    // 将status设置为2
    auditFail (id) {
      request.post('/api/auditFail', { id: id }).then(res => {
        if (res.status == 0) {
          console.log(res.message);
        } else {
          var msg = res.message
          alert(msg)
        }
      })
    }
  },
  created () {
    this.getAuditData()
  },
  updated () {
    // 修改、删除后，重新加载数据
    this.getAuditData()
  },
  computed: {
    id () {
      return localStorage.getItem('id') || this.$store.state.id || ''
    },
  }
}
</script>

<style lang="less">
.auditData {

  // 列表，显示status=1的数据
  .auditData-content {
    width: 100%;
    border: 1px solid rgb(214, 204, 204);
    border-radius: 10px;
    padding: 10px 10px 0 10px;
    margin-bottom: 50px;
    font-size: 14px;

    // 标题——用户的id，也就是belong
    .auditData-top {
      font-size: 12px;
      font-weight: lighter;
      margin-bottom: 5px;
    }

    // 内容——6个证型系数、6个证型得分、操作（审核通过、审核不通过）
    .auditData-main {
      display: flex;
      align-items: center;

      // 审核通过、审核不通过按钮
      .btnGroup {
        width: 185px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  th {
    font-weight: 400;
  }

}
</style>