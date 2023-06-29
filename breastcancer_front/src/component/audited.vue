<template>
  <!-- 用户——已审核页面 -->
  
  <div class="audited">
    <!-- 列表，显示status=2和3的数据 -->
    <ul>
      <li class="audited-content" v-for="(item, index) in this.auditedData" :key="index">
        <!-- 标题——提交数据的时间 -->
        <div class="audited-top">
          提交时间：{{ item.createtime }}
        </div>
        <!-- 内容——6个证型系数、操作（查看、审核通过、审核不通过） -->
        <table class="table">
          <thead>
            <tr>
              <th>肝气郁结证型系数</th>
              <th>热毒蕴结证型系数</th>
              <th>冲任失调证型系数</th>
              <th>气血两虚证型系数</th>
              <th>脾胃虚弱证型系数</th>
              <th>肝肾阴虚证型系数</th>
              <th>TNM分期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ item.gqyj }}</td>
              <td>{{ item.rdyj }}</td>
              <td>{{ item.crst }}</td>
              <td>{{ item.qxlx }}</td>
              <td>{{ item.pwxr }}</td>
              <td>{{ item.gsyx }}</td>
              <td>{{ item.TNM }}</td>
              <td class="audited-operation">
                <span @click="openDialog(item.id)">查看</span>
                <span class="auditSuccess" v-if="item.status == 2">审核通过</span>
                <span class="auditFail" v-else>审核不通过</span>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>

    <!-- 查看弹出框 -->
    <van-dialog v-model:show="showEditDialog" title="编辑数据" show-cancel-button width="400px">
      <div class="auditedBox">
        <div class="item">
          <span>肝气郁结证型得分(满分40)：{{ this.editData.gqyj }}</span>
          <span class="item-2">证型系数为：{{ this.auditedResult.gqyj }}</span>
        </div>
        <div class="item">
          <span>热毒蕴结证型得分(满分40)：{{ this.editData.rdyj }}</span>
          <span class="item-2">证型系数为：{{ this.auditedResult.rdyj }}</span>
        </div>
        <div class="item">
          <span>冲任失调证型得分(满分40)：{{ this.editData.crst }}</span>
          <span class="item-2">证型系数为：{{ this.auditedResult.crst }}</span>
        </div>
        <div class="item">
          <span>气血两虚证型得分(满分40)：{{ this.editData.qxlx }}</span>
          <span class="item-2">证型系数为：{{ this.auditedResult.qxlx }}</span>
        </div>
        <div class="item">
          <span>脾胃虚弱证型得分(满分40)：{{ this.editData.pwxr }}</span>
          <span class="item-2">证型系数为：{{ this.auditedResult.pwxr }}</span>
        </div>
        <div class="item">
          <span>肝肾阴虚证型得分(满分40)：{{ this.editData.gsyx }}</span>
          <span class="item-2">证型系数为：{{ this.auditedResult.gsyx }}</span>
        </div>
        <div class="item">
            <span>TNM分期：{{ this.auditedResult.TNM }}</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'audited',
  data () {
    return {
      // 已审核的数据——status=2和3
      auditedData: [],
      // 弹出框
      showEditDialog: false,
      // 弹出框的数据
      editData: {
        gqyj: '',
        rdyj: '',
        crst: '',
        qxlx: '',
        pwxr: '',
        gsyx: '',
      },
      // 点击查看，获取到的数据
      auditedResult: []
    }
  },
  methods: {
    // 根据belong获取已审核的数据——status=2和3
    getAudited () {
      request.get('/api/getAudited/' + this.id).then(res => {
        if (res.status == 0) {
          this.auditedData = res.data
        } else {
          console.log(res.data);
        }
      })
    },
    // 点击修改，弹出对话框，根据id获取audit中的数据
    openDialog (id) {
      this.showEditDialog = true
      this.search(id)
    },
    // 根据id获取audit中的数据
    search (id) {
      request.get('/api/getAuditingById/' + id).then(res => {
        if (res.status == 0) {
          this.auditedResult = res.data
          this.editData.gqyj = Math.round(this.auditedResult.gqyj * 40)
          this.editData.rdyj = Math.round(this.auditedResult.rdyj * 40)
          this.editData.crst = Math.round(this.auditedResult.crst * 40)
          this.editData.qxlx = Math.round(this.auditedResult.qxlx * 40)
          this.editData.pwxr = Math.round(this.auditedResult.pwxr * 40)
          this.editData.gsyx = Math.round(this.auditedResult.gsyx * 40)
        } else {
          var msg = res.message
          alert(msg)
        }
      })
    },
  },
  created () {
    this.getAudited()
  },
  computed: {
    id () {
      return localStorage.getItem('id') || this.$store.state.id || ''
    },
  }
}
</script>

<style lang="less">
.audited {

  // 列表，显示status=2和3的数据
  .audited-content {
    width: 100%;
    border: 1px solid rgb(214, 204, 204);
    border-radius: 10px;
    padding: 10px 10px 0 10px;
    margin-bottom: 50px;
    font-size: 14px;

    // 标题——提交数据的时间
    .audited-top {
      font-size: 12px;
      font-weight: lighter;
      margin-bottom: 5px;
    }

    // 操作——查看、审核通过、审核不通过
    .audited-operation {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      // 审核通过
      .auditSuccess {
        color: #67c23a;
      }

      // 审核不通过
      .auditFail {
        color: #f56c6c;
      }
    }
  }

  // 修改弹出框
  .van-dialog {
    padding: 10px;

    .auditedBox {
      padding: 10px;

      .item {
        height: 40px;
        font-size: 14px;
        line-height: 40px;

        .item-2 {
          margin-left: 40px;
        }
      }
    }
  }

  th {
    font-weight: 400;
  }
}
</style>