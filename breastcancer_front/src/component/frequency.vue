<template>
  <div class="frequency" v-loading="loading">
    <!-- 显示关联分析结果 -->
    <div class="apriori">
      <button type="button" class="btn btn-primary" @click="this.frequencyDialog = true"
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
            <tr v-for="(item, index) in this.frequencyApriori" :key="index">
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
            <tr v-for="(item1, index1) in this.frequencyDescription" :key="index1">
              <td>
                <div style="height: 100px;">{{ item1 }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 模型参数弹出框 -->
    <van-dialog v-model:show="frequencyDialog" title="参数设置" show-cancel-button width="500px" @confirm="runFrequency">
      <div class="parameter">
        <div class="recommendParameter">
          <p>Apriori关联分析最小支持度（推荐）：0.06</p>
          <p>Apriori关联分析最小置信度（推荐）：0.75</p>
        </div>
        <div class="parameterInput">
          <div>
            <span>最小支持度：</span>
            <input type="text" v-model="frequencySup">
          </div>
          <div>
            <span>最小置信度：</span>
            <input type="text" v-model="frequencyConf">
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'frequency',
  data () {
    return {
      // 列名、支持度、置信度为一个数组
      frequencyApriori: [],
      // 离散算法范围
      frequencyRange: [],
      frequencyDescription: [],
      loading: false,
      frequencyDialog: false,
      frequencySup: 0.06,
      frequencyConf: 0.75
    }
  },
  created () {
    this.getRange()
  },
  methods: {
    // 查询关联分析结果的数据表
    getAprioriResult () {
      // 清空上一次的离散结果
      this.frequencyApriori = []
      let promise1 = new Promise((resolve, reject) => {
        request.get('/api/getApriori/frequencyapriori').then(res => {
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
            this.frequencyApriori.push(res.data[i])
          }
        }
        localStorage.removeItem('frequencyApriori')
        localStorage.setItem('frequencyApriori', JSON.stringify(this.frequencyApriori))
        this.getFrequencyDescription()
      })
        .catch(res => {
          console.log(res.message)

        })
      return promise1
    },
    getRange () {
      let promise2 = new Promise((resolve, reject) => {
        request.get('/api/getRange/frequencyrange').then(res => {
          if (res.status === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      }).then(res => {
        // 数组类型
        var frequencyRange = res.data
        // 获取数组中的元素
        for (var i = 0; i < frequencyRange.length; i++) {
          // 对象类型
          var obj = frequencyRange[i]
          // 获取对象中的值
          for (var j in obj) {
            obj[j] = obj[j].toFixed(3)
          }
        }
        this.frequencyRange = frequencyRange
        localStorage.removeItem('frequencyRange')
        localStorage.setItem('frequencyRange', JSON.stringify(this.frequencyRange))
        this.getAprioriResult()
      })
        .catch(res => {
          console.log(res.message);
        })
      return promise2
    },
    // 关联结果说明
    getFrequencyDescription () {
      this.frequencyDescription = []
      // 对每一条关联结果进行处理
      for (var n = 0; n < this.frequencyApriori.length; n++) {
        var str3 = this.frequencyApriori[n].result.substring(0, this.frequencyApriori[n].result.length - 3).split("_")
        var fr1 = ''
        var fr2 = ''
        var fr3 = ''
        var fr4 = ''
        var fr5 = ''
        var fr6 = ''
        // 这里出了大问题,因为上一个循环用了变量i,这里忘记了,还是用了i,所以陷入死循环
        for (var p = 0; p < str3.length; p++) {
          switch (str3[p]) {
            case "A1":
              fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][0] + ',' + this.frequencyRange[0][1] + ']范围内, '
              break
            case "A2":
              fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][1] + ',' + this.frequencyRange[0][2] + ']范围内, '
              break
            case "A3":
              fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][2] + ',' + this.frequencyRange[0][3] + ']范围内, '
              break
            case "A4":
              fr1 = '肝气郁结证型系数处于(' + this.frequencyRange[0][3] + ',' + this.frequencyRange[0][4] + ']范围内, '
              break
            case "B1":
              fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][0] + ',' + this.frequencyRange[1][1] + ']范围内, '
              break
            case "B2":
              fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][1] + ',' + this.frequencyRange[1][2] + ']范围内, '
              break
            case "B3":
              fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][2] + ',' + this.frequencyRange[1][3] + ']范围内, '
              break
            case "B4":
              fr2 = '热毒蕴结证型系数处于(' + this.frequencyRange[1][3] + ',' + this.frequencyRange[1][4] + ']范围内, '
              break
            case "C1":
              fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][0] + ',' + this.frequencyRange[2][1] + ']范围内, '
              break
            case "C2":
              fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][1] + ',' + this.frequencyRange[2][2] + ']范围内, '
              break
            case "C3":
              fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][2] + ',' + this.frequencyRange[2][3] + ']范围内, '
              break
            case "C4":
              fr3 = '冲任失调证型系数处于(' + this.frequencyRange[2][3] + ',' + this.frequencyRange[2][4] + ']范围内, '
              break
            case "D1":
              fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][0] + ',' + this.frequencyRange[3][1] + ']范围内, '
              break
            case "D2":
              fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][1] + ',' + this.frequencyRange[3][2] + ']范围内, '
              break
            case "D3":
              fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][2] + ',' + this.frequencyRange[3][3] + ']范围内, '
              break
            case "D4":
              fr4 = '气血两虚证型系数处于(' + this.frequencyRange[3][3] + ',' + this.frequencyRange[3][4] + ']范围内, '
              break
            case "E1":
              fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][0] + ',' + this.frequencyRange[4][1] + ']范围内, '
              break
            case "E2":
              fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][1] + ',' + this.frequencyRange[4][2] + ']范围内, '
              break
            case "E3":
              fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][2] + ',' + this.frequencyRange[4][3] + ']范围内, '
              break
            case "E4":
              fr5 = '脾胃虚弱证型系数处于(' + this.frequencyRange[4][3] + ',' + this.frequencyRange[4][4] + ']范围内, '
              break
            case "F1":
              fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][0] + ',' + this.frequencyRange[5][1] + ']范围内, '
              break
            case "F2":
              fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][1] + ',' + this.frequencyRange[5][2] + ']范围内, '
              break
            case "F3":
              fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][2] + ',' + this.frequencyRange[5][3] + ']范围内, '
              break
            case "F4":
              fr6 = '肝肾阴虚证型系数处于(' + this.frequencyRange[5][3] + ',' + this.frequencyRange[5][4] + ']范围内, '
              break
          }
        }
        var fr = fr1 + fr2 + fr3 + fr4 + fr5 + fr6
        var frr = fr + 'TNM分期诊断为H4期的可能性为' + (this.frequencyApriori[n].confidence * 100).toFixed(1) + '%,而这种情况发生的可能性为' + (this.frequencyApriori[n].support * 100).toFixed(1) + '%。'
        this.frequencyDescription.push(frr)
      }
    },
    // 重新运行
    runFrequency () {
      this.loading = true
      let promise3 = new Promise((resolve, reject) => {
        request.post('/api/frequency', { support: this.frequencySup, confidence: this.frequencyConf }).then(res => {
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
  }
}
</script>

<style lang="less">
.frequency {

  // 显示关联分析结果
  .apriori {

    .aprioriMain {
      margin-top: 10px;
      display: flex;
    }


    th {
      font-weight: 400;
    }


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