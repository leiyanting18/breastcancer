<template>
  <div class="unaudit">
    <div class="addDataBox">
      <div class="addDataBox-item">
        <span>肝气郁结证型得分(满分40)：</span>
        <input type="text" v-model.trim="gqyj">
        <span>证型系数为：{{ (this.gqyj / 40).toFixed(3) }}</span>
      </div>
      <div class="addDataBox-item">
        <span>热毒蕴结证型得分(满分40)：</span>
        <input type="text" v-model.trim="rdyj">
        <span>证型系数为：{{ (this.rdyj / 40).toFixed(3) }}</span>
      </div>
      <div class="addDataBox-item">
        <span>冲任失调证型得分(满分40)：</span>
        <input type="text" v-model.trim="crst">
        <span>证型系数为：{{ (this.crst / 40).toFixed(3) }}</span>
      </div>
      <div class="addDataBox-item">
        <span>气血两虚证型得分(满分40)：</span>
        <input type="text" v-model.trim="qxlx">
        <span>证型系数为：{{ (this.qxlx / 40).toFixed(3) }}</span>
      </div>
      <div class="addDataBox-item">
        <span>脾胃虚弱证型得分(满分40)：</span>
        <input type="text" v-model.trim="pwxr">
        <span>证型系数为：{{ (this.pwxr / 40).toFixed(3) }}</span>
      </div>
      <div class="addDataBox-item">
        <span>肝肾阴虚证型得分(满分40)：</span>
        <input type="text" v-model.trim="gsyx">
        <span>证型系数为：{{ (this.gsyx / 40).toFixed(3) }}</span>
      </div>
      <div class="addDataBox-select">
        <span>TNM分期：</span>
        <select v-model="this.TNM">
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
        </select>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="submitData">提交</button>
  </div>
</template>

<script>
import request from '../request/request'
export default {
  name: 'unaudit',
  data () {
    return {
      gqyj: '',
      rdyj: '',
      crst: '',
      qxlx: '',
      pwxr: '',
      gsyx: '',
      TNM:''
    }
  },
  methods: {
    // 用户提交新增的数据事件
    submitData () {
      // 将数据转换为系数
      var gqyj = (this.gqyj / 40).toFixed(3)
      var rdyj = (this.rdyj / 40).toFixed(3)
      var crst = (this.crst / 40).toFixed(3)
      var qxlx = (this.qxlx / 40).toFixed(3)
      var pwxr = (this.pwxr / 40).toFixed(3)
      var gsyx = (this.gsyx / 40).toFixed(3)
      // 数据不能为空
      if (!gqyj || !rdyj || !crst || !qxlx || !pwxr || !gsyx || !this.TNM || !this.id ) {
        alert('添加的数据不能为空！')
      } else {
        request.post('/api/userAddDataset', { gqyj: gqyj, rdyj: rdyj, crst: crst, qxlx: qxlx, pwxr: pwxr, gsyx: gsyx, TNM: this.TNM ,belong:this.id}).then(res => {
          if (res.status === 1) {
            var msg = res.message
            alert(msg)
            // 清空输入框
            this.gqyj = ''
            this.rdyj = ''
            this.crst = ''
            this.qxlx = ''
            this.pwxr = ''
            this.gsyx = ''
            this.TNM = ''
          } else if (res.status === 0) {
            alert('添加数据成功！')
            // 清空输入框
            this.gqyj = ''
            this.rdyj = ''
            this.crst = ''
            this.qxlx = ''
            this.pwxr = ''
            this.gsyx = ''
            this.TNM = ''
          }
        })
      }

    },
  },
  computed: {
    id () {
      return localStorage.getItem('id') || this.$store.state.id || ''
    },
  },
}
</script>

<style lang="less">
.unaudit {
  .addDataBox {
    width: 80%;
    font-size: 16px;
    margin-bottom: 12px;

    .addDataBox-item {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 40px;
    }

    .addDataBox-select {
      width: 400px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 30px;
      justify-content: space-around;
      height: 40px;

      select {
        width: 100px;
      }
    }
  }

  .btn {
    margin-top: 20px;
    margin-left: 40%;
  }

  th {
    font-weight: 400;
  }
}
</style>