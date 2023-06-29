<template>
  <div class="kmeans" v-loading="loading">
    <!-- 显示关联分析结果 -->
    <div class="apriori">
      <button type="button" class="btn btn-primary" @click="this.kmeansDialog = true"
        v-if="this.isAdmin == 1">重新关联分析</button>
      <div class="aprioriMain">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>关联规则</th>
              <th>支持度</th>
              <th>置信度</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.kmeansApriori" :key="index">
              <td>{{ item.result }}</td>
              <td>{{ item.support.toFixed(3) }}</td>
              <td>{{ item.confidence.toFixed(3) }}</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>结果说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1, index1) in this.kmeansDescription" :key="index1">
              <td>
                <div style="height: 100px;">{{ item1 }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 模型参数弹出框 -->
    <van-dialog v-model:show="kmeansDialog" title="参数设置" show-cancel-button width="500px" @confirm="runKmeans">
      <div class="parameter">
        <div class="recommendParameter">
          <p>Apriori关联分析最小支持度（推荐）：0.06</p>
          <p>Apriori关联分析最小置信度（推荐）：0.75</p>
        </div>
        <div class="parameterInput">
          <div>
            <span>最小支持度：</span>
            <input type="text" v-model="kmeansSup">
          </div>
          <div>
            <span>最小置信度：</span>
            <input type="text" v-model="kmeansConf">
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'kmeans',
  data () {
    return {
      // 列名、支持度、置信度为一个数组
      kmeansApriori: [],
      // 离散算法范围
      kmeansRange: [],
      kmeansDescription: [],
      loading: false,
      kmeansDialog: false,
      kmeansSup: 0.06,
      kmeansConf: 0.75
    }
  },
  created () {
    this.getRange()
  },
  methods: {
    // 查询关联分析结果的数据表
    getAprioriResult () {
      // 清空上一次的离散结果
      this.kmeansApriori = []
      let promise1 = new Promise((resolve, reject) => {
        request.get('/api/getApriori/kmeansapriori').then(res => {
          if (res.status === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      }).then(res => {
        // 遍历，筛选出以H4结尾的数据
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].result.charAt(res.data[i].result.length - 2) == 'H') {
            this.kmeansApriori.push(res.data[i])
          }
        }
        localStorage.removeItem('kmeansApriori')
        localStorage.setItem('kmeansApriori', JSON.stringify(this.kmeansApriori))
        this.getKmeansDescription()
      })
        .catch(res => {
          var msg = res.message
          alert(msg)
        })
      return promise1
    },
    getRange () {
      let promise2 = new Promise((resolve, reject) => {
        request.get('/api/getRange/kmeansrange').then(res => {
          if (res.status === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      }).then(res => {
        console.log(res.data);
        // 数组类型
        var kmeansRange = res.data
        // 获取数组中的元素
        for (var i = 0; i < kmeansRange.length; i++) {
          // 对象类型
          var obj = kmeansRange[i]
          // 获取对象中的值
          for (var j in obj) {
            obj[j] = obj[j].toFixed(3)
          }
        }
        this.kmeansRange = kmeansRange
        localStorage.removeItem('kmeansRange')
        localStorage.setItem('kmeansRange', JSON.stringify(this.kmeansRange))
        this.getAprioriResult()
      })
        .catch(res => {
          console.log(res.message);
        })
      return promise2
    },
    // 关联结果说明
    getKmeansDescription () {
      this.kmeansDescription = []
      // 对每一条关联结果进行处理
      for (var k = 0; k < this.kmeansApriori.length; k++) {
        var str1 = this.kmeansApriori[k].result.substring(0, this.kmeansApriori[k].result.length - 3).split("_")
        var kr1 = ''
        var kr2 = ''
        var kr3 = ''
        var kr4 = ''
        var kr5 = ''
        var kr6 = ''
        for (var m = 0; m < str1.length; m++) {
          switch (str1[m]) {
            case "A1":
              kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][1] + ',' + this.kmeansRange[0][2] + ']范围内, '
              break
            case "A2":
              kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][2] + ',' + this.kmeansRange[0][3] + ']范围内, '
              break
            case "A3":
              kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][3] + ',' + this.kmeansRange[0][4] + ']范围内, '
              break
            case "A4":
              kr1 = '肝气郁结证型系数处于(' + this.kmeansRange[0][4] + ',' + this.kmeansRange[0][5] + ']范围内, '
              break
            case "B1":
              kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][1] + ',' + this.kmeansRange[1][2] + ']范围内, '
              break
            case "B2":
              kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][2] + ',' + this.kmeansRange[1][3] + ']范围内, '
              break
            case "B3":
              kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][3] + ',' + this.kmeansRange[1][4] + ']范围内, '
              break
            case "B4":
              kr2 = '热毒蕴结证型系数处于(' + this.kmeansRange[1][4] + ',' + this.kmeansRange[1][5] + ']范围内, '
              break
            case "C1":
              kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][1] + ',' + this.kmeansRange[2][2] + ']范围内, '
              break
            case "C2":
              kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][2] + ',' + this.kmeansRange[2][3] + ']范围内, '
              break
            case "C3":
              kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][3] + ',' + this.kmeansRange[2][4] + ']范围内, '
              break
            case "C4":
              kr3 = '冲任失调证型系数处于(' + this.kmeansRange[2][4] + ',' + this.kmeansRange[2][5] + ']范围内, '
              break
            case "D1":
              kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][1] + ',' + this.kmeansRange[3][2] + ']范围内, '
              break
            case "D2":
              kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][2] + ',' + this.kmeansRange[3][3] + ']范围内, '
              break
            case "D3":
              kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][3] + ',' + this.kmeansRange[3][4] + ']范围内, '
              break
            case "D4":
              kr4 = '气血两虚证型系数处于(' + this.kmeansRange[3][4] + ',' + this.kmeansRange[3][5] + ']范围内, '
              break
            case "E1":
              kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][1] + ',' + this.kmeansRange[4][2] + ']范围内, '
              break
            case "E2":
              kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][2] + ',' + this.kmeansRange[4][3] + ']范围内, '
              break
            case "E3":
              kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][3] + ',' + this.kmeansRange[4][4] + ']范围内, '
              break
            case "E4":
              kr5 = '脾胃虚弱证型系数处于(' + this.kmeansRange[4][4] + ',' + this.kmeansRange[4][5] + ']范围内, '
              break
            case "F1":
              kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][1] + ',' + this.kmeansRange[5][2] + ']范围内, '
              break
            case "F2":
              kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][2] + ',' + this.kmeansRange[5][3] + ']范围内, '
              break
            case "F3":
              kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][3] + ',' + this.kmeansRange[5][4] + ']范围内, '
              break
            case "F4":
              kr6 = '肝肾阴虚证型系数处于(' + this.kmeansRange[5][4] + ',' + this.kmeansRange[5][5] + ']范围内, '
              break
          }
        }
        var kr = kr1 + kr2 + kr3 + kr4 + kr5 + kr6
        var krr = kr + 'TNM分期诊断为H4期的可能性为' + (this.kmeansApriori[k].confidence * 100).toFixed(1) + '%,而这种情况发生的可能性为' + (this.kmeansApriori[k].support * 100).toFixed(1) + '%。'
        this.kmeansDescription.push(krr)
      }
    },
    // 重新运行
    runKmeans () {
      this.loading = true
      let promise3 = new Promise((resolve, reject) => {
        request.post('/api/kmeans', { support: this.kmeansSup, confidence: this.kmeansConf }).then(res => {
          if (res.status === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      }).then(res => {
        console.log(res.message);
        this.getRange()
        this.loading = false
      })
        .catch(res => {
          console.log(res.message);
        })
      return promise3
    }
  },
  computed: {
    isAdmin () {
      return localStorage.getItem('isAdmin') || this.$store.state.isAdmin || ''
    }
  },
}
</script>

<style lang="less">
.kmeans {

  // 显示关联分析结果
  .apriori {

    .aprioriMain {
      margin-top: 10px;
      display: flex;
    }
  }


  th {
    font-weight: 400;
  }

  .parameter {
    margin: 20px auto;
    text-align: center;

    .recommendParameter {
      font-size: 14px;
    }

    .parameterInput {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>