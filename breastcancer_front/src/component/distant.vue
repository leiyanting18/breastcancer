<template>
  <div class="distant" v-loading="loading">
    <!-- 显示关联分析结果 -->
    <div class="apriori">
      <button type="button" class="btn btn-primary" @click="this.distantDialog = true"
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
            <tr v-for="(item, index) in this.distantApriori" :key="index">
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
            <tr v-for="(item1, index1) in this.distantDescription" :key="index1">
              <td>
                <div style="height: 100px;">{{ item1 }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 模型参数弹出框 -->
    <van-dialog v-model:show="distantDialog" title="参数设置" show-cancel-button width="500px" @confirm="runDistant">
      <div class="parameter">
        <div class="recommendParameter">
          <p>Apriori关联分析最小支持度（推荐）：0.06</p>
          <p>Apriori关联分析最小置信度（推荐）：0.75</p>
        </div>
        <div class="parameterInput">
          <div>
            <span>最小支持度：</span>
            <input type="text" v-model="distantSup">
          </div>
          <div>
            <span>最小置信度：</span>
            <input type="text" v-model="distantConf">
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'distant',
  data () {
    return {
      // 列名、支持度、置信度为一个数组
      distantApriori: [],
      // 离散算法范围
      distantRange: [],
      distantDescription: [],
      loading: false,
      distantDialog: false,
      distantSup: 0.06,
      distantConf: 0.75
    }
  },
  created () {
    this.getRange()
  },
  methods: {
    // 查询关联分析结果的数据表
    getAprioriResult () {
      // 清空上一次的离散结果
      this.distantApriori = []
      let promise1 = new Promise((resolve, reject) => {
        request.get('/api/getApriori/distantapriori').then(res => {
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
            this.distantApriori.push(res.data[i])
          }
        }
        // // 存放列名以H结尾的数据
        // // 返回的res是一个对象
        // // 获取对象的key——列名
        // // var columns = Object.keys(aprioriResult[0])
        // // 获取列名
        // var columns = []
        // for (var i = 0; i < aprioriResult.length; i++) {
        //   columns.push(aprioriResult[i].result)
        // }
        // console.log(columns);
        // // 获取对象的value——支持度
        // // var supports = Object.values(aprioriResult[0])
        // // for (var i = 0; i < supports.length; i++) {
        // //   supports[i] = supports[i].toFixed(3)
        // // }

        // // 获取支持度
        // var supports = []

        // // 获取对象的value——置信度
        // var confidence = Object.values(aprioriResult[1])
        // for (var i = 0; i < confidence.length; i++) {
        //   confidence[i] = confidence[i].toFixed(3)
        // }
        // // 连接以上三个数组
        // var list = columns.concat(supports).concat(confidence)
        // // 将数据按照列名、支持度、置信度的顺序一一排序
        // var arr = []
        // for (var i = 0; i < columns.length; i++) {
        //   for (var j = i; j < list.length; j = j + columns.length) {
        //     arr.push(list[j])
        //   }
        // }
        // // 将对应的列名、支持度、置信度这三个元素分为一组
        // this.distantApriori = this.group(arr, 3);
        localStorage.removeItem('distantApriori')
        localStorage.setItem('distantApriori', JSON.stringify(this.distantApriori))
        this.getDistantDescription()
      })
        .catch(res => {
          console.log(res.message);
        })
      return promise1
    },
    getRange () {
      let promise2 = new Promise((resolve, reject) => {
        request.get('/api/getRange/distantrange').then(res => {
          if (res.status === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      }).then(res => {
        // 数组类型
        var distantRange = res.data
        // 获取数组中的元素
        for (var i = 0; i < distantRange.length; i++) {
          // 对象类型
          var obj = distantRange[i]
          // 获取对象中的值
          for (var j in obj) {
            obj[j] = obj[j].toFixed(3)
          }
        }
        this.distantRange = distantRange
        localStorage.removeItem('distantRange')
        localStorage.setItem('distantRange', JSON.stringify(this.distantRange))
        this.getAprioriResult()
      })
        .catch(res => {
          console.log(res.message);
        })
      return promise2
    },
    // 将对应的列名、支持度、置信度这三个元素分为一组
    // group (array, subGroupLength) {
    //   let index = 0;
    //   let newArray = [];
    //   while (index < array.length) {
    //     newArray.push(array.slice(index, index += subGroupLength));
    //   }
    //   return newArray;
    // },
    // 关联结果说明
    getDistantDescription () {
      this.distantDescription = []
      // 对每一条关联结果进行处理
      for (var i = 0; i < this.distantApriori.length; i++) {
        var str2 = this.distantApriori[i].result.substring(0, this.distantApriori[i].result.length - 3).split("_")
        var dr1 = ''
        var dr2 = ''
        var dr3 = ''
        var dr4 = ''
        var dr5 = ''
        var dr6 = ''
        // 这里出了大问题,因为上一个循环用了变量i,这里忘记了,还是用了i,所以陷入死循环
        for (var j = 0; j < str2.length; j++) {
          switch (str2[j]) {
            case "A1":
              dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][0] + ',' + this.distantRange[0][1] + ']范围内, '
              break
            case "A2":
              dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][1] + ',' + this.distantRange[0][2] + ']范围内, '
              break
            case "A3":
              dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][2] + ',' + this.distantRange[0][3] + ']范围内, '
              break
            case "A4":
              dr1 = '肝气郁结证型系数处于(' + this.distantRange[0][3] + ',' + this.distantRange[0][4] + ']范围内, '
              break
            case "B1":
              dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][0] + ',' + this.distantRange[1][1] + ']范围内, '
              break
            case "B2":
              dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][1] + ',' + this.distantRange[1][2] + ']范围内, '
              break
            case "B3":
              dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][2] + ',' + this.distantRange[1][3] + ']范围内, '
              break
            case "B4":
              dr2 = '热毒蕴结证型系数处于(' + this.distantRange[1][3] + ',' + this.distantRange[1][4] + ']范围内, '
              break
            case "C1":
              dr3 = '冲任失调证型系数处于(' + this.distantRange[2][0] + ',' + this.distantRange[2][1] + ']范围内, '
              break
            case "C2":
              dr3 = '冲任失调证型系数处于(' + this.distantRange[2][1] + ',' + this.distantRange[2][2] + ']范围内, '
              break
            case "C3":
              dr3 = '冲任失调证型系数处于(' + this.distantRange[2][2] + ',' + this.distantRange[2][3] + ']范围内, '
              break
            case "C4":
              dr3 = '冲任失调证型系数处于(' + this.distantRange[2][3] + ',' + this.distantRange[2][4] + ']范围内, '
              break
            case "D1":
              dr4 = '气血两虚证型系数处于(' + this.distantRange[3][0] + ',' + this.distantRange[3][1] + ']范围内, '
              break
            case "D2":
              dr4 = '气血两虚证型系数处于(' + this.distantRange[3][1] + ',' + this.distantRange[3][2] + ']范围内, '
              break
            case "D3":
              dr4 = '气血两虚证型系数处于(' + this.distantRange[3][2] + ',' + this.distantRange[3][3] + ']范围内, '
              break
            case "D4":
              dr4 = '气血两虚证型系数处于(' + this.distantRange[3][3] + ',' + this.distantRange[3][4] + ']范围内, '
              break
            case "E1":
              dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][0] + ',' + this.distantRange[4][1] + ']范围内, '
              break
            case "E2":
              dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][1] + ',' + this.distantRange[4][2] + ']范围内, '
              break
            case "E3":
              dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][2] + ',' + this.distantRange[4][3] + ']范围内, '
              break
            case "E4":
              dr5 = '脾胃虚弱证型系数处于(' + this.distantRange[4][3] + ',' + this.distantRange[4][4] + ']范围内, '
              break
            case "F1":
              dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][0] + ',' + this.distantRange[5][1] + ']范围内, '
              break
            case "F2":
              dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][1] + ',' + this.distantRange[5][2] + ']范围内, '
              break
            case "F3":
              dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][2] + ',' + this.distantRange[5][3] + ']范围内, '
              break
            case "F4":
              dr6 = '肝肾阴虚证型系数处于(' + this.distantRange[5][3] + ',' + this.distantRange[5][4] + ']范围内, '
              break
          }
        }
        var dr = dr1 + dr2 + dr3 + dr4 + dr5 + dr6
        var drr = dr + 'TNM分期诊断为H4期的可能性为' + (this.distantApriori[i].confidence * 100).toFixed(1) + '%,而这种情况发生的可能性为' + (this.distantApriori[i].support * 100).toFixed(1) + '%。'
        this.distantDescription.push(drr)
      }
    },
    // 重新运行
    runDistant () {
      this.loading = true
      let promise3 = new Promise((resolve, reject) => {
        request.post('/api/distant', { support: this.distantSup, confidence: this.distantConf }).then(res => {
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
.distant {

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