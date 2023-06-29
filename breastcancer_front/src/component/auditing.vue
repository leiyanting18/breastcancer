<template>
  <!-- 用户——审核中页面 -->
  
  <div class="auditing">
    <!-- 列表，显示status=1的数据 -->
    <ul>
      <li class="auditing-content" v-for="(item, index) in this.auditingData" :key="index">
        <!-- 标题——提交数据的时间 -->
        <div class="auditing-top">
          提交时间：{{ item.createtime }}
        </div>
        <!-- 内容——6个证型系数、操作（修改、删除） -->
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
              <td class="auditing-operation">
                <span @click="openDialog(item.id)">修改</span>
                <span @click="deleteData(item.id)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>

    <!-- 修改弹出框 -->
    <van-dialog v-model:show="showEditDialog" title="编辑数据" show-cancel-button width="500px" @confirm="submitEditData">
      <div class="addDataBox">
        <div class="addDataBox-item">
          <span>肝气郁结证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.gqyj">
          <span>证型系数为：{{ (this.editData.gqyj / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>热毒蕴结证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.rdyj">
          <span>证型系数为：{{ (this.editData.rdyj / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>冲任失调证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.crst">
          <span>证型系数为：{{ (this.editData.crst / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>气血两虚证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.qxlx">
          <span>证型系数为：{{ (this.editData.qxlx / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>脾胃虚弱证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.pwxr">
          <span>证型系数为：{{ (this.editData.pwxr / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>肝肾阴虚证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.gsyx">
          <span>证型系数为：{{ (this.editData.gsyx / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-select">
            <span>TNM分期：</span>
            <select v-model="editData.TNM">
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
            </select>
          </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'auditing',
  data () {
    return {
      // status=1的数据
      auditingData: [],
      // 修改弹出框
      showEditDialog: false,
      // 修改弹出框的数据
      editData: {
        id: '',
        gqyj: '',
        rdyj: '',
        crst: '',
        qxlx: '',
        pwxr: '',
        gsyx: '',
        TNM:''
      },
      // 点击查看，获取到的数据
      auditingResult: []
    }
  },
  methods: {
    // 获取status=1的数据
    getAuditing () {
      request.get('/api/getAuditing/' + this.id).then(res => {
        if (res.status == 0) {
          this.auditingData = res.data
        } else {
          console.log(res.message);
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
          this.auditingResult = res.data
          this.editData.id = this.auditingResult.id
          this.editData.gqyj = Math.round(this.auditingResult.gqyj * 40)
          this.editData.rdyj = Math.round(this.auditingResult.rdyj * 40)
          this.editData.crst = Math.round(this.auditingResult.crst * 40)
          this.editData.qxlx = Math.round(this.auditingResult.qxlx * 40)
          this.editData.pwxr = Math.round(this.auditingResult.pwxr * 40)
          this.editData.gsyx = Math.round(this.auditingResult.gsyx * 40)
          this.editData.TNM= this.auditingResult.TNM
        } else {
          var msg = res.message
          alert(msg)
        }
      })
    },
    // 根据id提交对话框中的数据
    // 数据不得为空
    // 将数据转换为系数
    // 系数不能为空
    // axios请求
    // 点击删除，将status设置为0
    submitEditData () {
      if (!this.editData.gqyj || !this.editData.rdyj || !this.editData.crst || !this.editData.qxlx || !this.editData.pwxr || !this.editData.gsyx || !this.editData.TNM ) {
        alert('数据不能为空')
      } else {
        var gqyj = (this.editData.gqyj / 40).toFixed(3)
        var rdyj = (this.editData.rdyj / 40).toFixed(3)
        var crst = (this.editData.crst / 40).toFixed(3)
        var qxlx = (this.editData.qxlx / 40).toFixed(3)
        var pwxr = (this.editData.pwxr / 40).toFixed(3)
        var gsyx = (this.editData.gsyx / 40).toFixed(3)
        if (!gqyj || !rdyj || !crst || !qxlx || !pwxr || !gsyx ) {
          alert('数据不能为空！')
        } else {
          request.post('/api/updateAuditingById', { gqyj: gqyj, rdyj: rdyj, crst: crst, qxlx: qxlx, pwxr: pwxr, gsyx: gsyx, TNM:this.editData.TNM ,id: this.auditingResult.id }).then(res => {
            if (res.status == 0) {
              alert('修改数据成功')
              this.search(this.editData.id)
            } else {
              var msg = res.message
              alert(msg)
            }
          })
        }
      }
    },
    // 根据id删除数据
    deleteData (id) {
      request.post('/api/deleteAuditingById', { id: id }).then(res => {
        if (res.status == 1) {
          var msg = res.message
          alert(msg)
        } else {
          alert('修改数据成功')
        }
      })
    },
  },
  created () {
    this.getAuditing()
  },
  updated () {
    // 修改、删除后，重新加载数据
    this.getAuditing()
  },
  computed: {
    id () {
      return localStorage.getItem('id') || this.$store.state.id || ''
    },
  }
}
</script>

<style lang="less">
.auditing {

  // 列表，显示status=1的数据
  .auditing-content {
    width: 100%;
    border: 1px solid rgb(214, 204, 204);
    border-radius: 10px;
    padding: 10px 10px 0 10px;
    margin-bottom: 50px;
    font-size: 14px;

    .auditing-top {
      font-size: 12px;
      font-weight: lighter;
      margin-bottom: 5px;
    }

    .auditing-operation {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .van-dialog {

    .addDataBox{
      font-size: 14px;
      padding: 15px;

      .addDataBox-item{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }

    .addDataBox-select {
      width: 350px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;

      select {
        width: 100px;
      }
    }
  }

  th {
    font-weight: 400;
  }
}
</style>