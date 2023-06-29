<template>
  <div class="predictHistory">
    <ul>
      <li class="predictHistory-content" v-for="(item, index) in this.predictHistoryData" :key="index">
        <!-- 标题——提交数据的时间 -->
        <div class="predictHistory-top">
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
              <td class="predictHistory-operation">
                <span @click="openDialog(item.id)">查看</span>
                <span @click="deleteData(item.id)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>

    <!-- 查看弹出框 -->
    <van-dialog v-model:show="showEditDialog" title="查看数据" show-cancel-button width="500px">
      <div class="auditedBox">
        <div>
          <span>肝气郁结证型得分(满分40)：{{ (this.predictHistoryResult.gqyj * 40).toFixed(0) }}</span>
          <span class="item-2">证型系数为：{{ this.predictHistoryResult.gqyj }}</span>
        </div>
        <div>
          <span>热毒蕴结证型得分(满分40)：{{ (this.predictHistoryResult.rdyj * 40).toFixed(0) }}</span>
          <span class="item-2">证型系数为：{{ this.predictHistoryResult.rdyj }}</span>
        </div>
        <div>
          <span>冲任失调证型得分(满分40)：{{ (this.predictHistoryResult.crst * 40).toFixed(0) }}</span>
          <span class="item-2">证型系数为：{{ this.predictHistoryResult.crst }}</span>
        </div>
        <div>
          <span>气血两虚证型得分(满分40)：{{ (this.predictHistoryResult.qxlx * 40).toFixed(0) }}</span>
          <span class="item-2">证型系数为：{{ this.predictHistoryResult.qxlx }}</span>
        </div>
        <div>
          <span>脾胃虚弱证型得分(满分40)：{{ (this.predictHistoryResult.pwxr * 40).toFixed(0) }}</span>
          <span class="item-2">证型系数为：{{ this.predictHistoryResult.pwxr }}</span>
        </div>
        <div>
          <span>肝肾阴虚证型得分(满分40)：{{ (this.predictHistoryResult.gsyx * 40).toFixed(0) }}</span>
          <span class="item-2">证型系数为：{{ this.predictHistoryResult.gsyx }}</span>
        </div>
        <div class="item">
          <div>
            <span>使用kmeans聚类离散后的关联结果：</span>
            <p v-for="item in this.kmeansResult" :key="item">{{ item }}</p>
          </div>
          <div>
            <span>使用等宽分箱离散后的关联结果：</span>
            <p v-for="item in this.distantResult" :key="item">{{ item }}</p>
          </div>
          <div>
            <span>使用等频分箱离散后的关联结果：</span>
            <p v-for="item in this.frequencyResult" :key="item">{{ item }}</p>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'

export default {
  name: 'predictHistory',
  data () {
    return {
      predictHistoryData: [],
      // 修改弹出框
      showEditDialog: false,
      // 点击查看，获取到的数据
      predictHistoryResult: [],
      // 关联分析的结果解析
      kmeansResult: [],
      distantResult: [],
      frequencyResult: []
    }
  },
  methods: {
    getPredictHistory () {
      request.get('/api/getPredictHistory/' + this.id).then(res => {
        if (res.status == 0) {
          this.predictHistoryData = res.data
        } else {
          console.log(res.message);
        }
      })
    },
    // 点击修改，弹出对话框，根据id获取predictHhstory中的数据
    openDialog (id) {
      this.showEditDialog = true
      this.search(id)
    },
    // 根据id获取predictHhstory中的数据
    search (id) {
      this.kmeansResult = []
      this.distantResult = []
      this.frequencyResult = []
      request.get('/api/getPredictHistoryById/' + id).then(res => {
        console.log(res.message);
        this.predictHistoryResult = res.data
        // 组装关联结果说明的语句
        this.getAprioriResult()
      })
    },
    // 根据id删除数据
    deleteData (id) {
      request.post('/api/deletePredictHistoryById', { id: id }).then(res => {
        if (res.status == 1) {
          var msg = res.message
          alert(msg)
        } else {
          alert('删除数据成功！')
        }
      })
    },
    // 组装关联结果说明的语句
    getAprioriResult () {
      // 判断是否符合kmeans聚类的强关联规则
      // 用标识（ABCDEF）表示数据——获取kmeansRange中的数据，用来判断范围
      // 将标识存进数组
      // 获取关联规则
      // 判断字符串中是否含有关联规则的那几个标识
      // 有,则显示有关联
      // 否则,显示无关联
      var k1 = ''
      var k2 = ''
      var k3 = ''
      var k4 = ''
      var k5 = ''
      var k6 = ''
      // 肝气郁结
      if (this.predictHistoryResult.gqyj >= this.kmeansRange[0][1] && this.predictHistoryResult.gqyj <= this.kmeansRange[0][2]) {
        k1 = 'A1'
      } else if (this.predictHistoryResult.gqyj > this.kmeansRange[0][2] && this.predictHistoryResult.gqyj <= this.kmeansRange[0][3]) {
        k1 = 'A2'
      }
      else if (this.predictHistoryResult.gqyj > this.kmeansRange[0][3] && this.predictHistoryResult.gqyj <= this.kmeansRange[0][4]) {
        k1 = 'A3'
      }
      else if (this.predictHistoryResult.gqyj > this.kmeansRange[0][4] && this.predictHistoryResult.gqyj <= this.kmeansRange[0][5]) {
        k1 = 'A4'
      }
      // 热毒蕴结
      if (this.predictHistoryResult.rdyj >= this.kmeansRange[1][1] && this.predictHistoryResult.rdyj <= this.kmeansRange[1][2]) {
        k2 = 'B1'
      } else if (this.predictHistoryResult.rdyj > this.kmeansRange[1][2] && this.predictHistoryResult.rdyj <= this.kmeansRange[1][3]) {
        k2 = 'B2'
      }
      else if (this.predictHistoryResult.rdyj > this.kmeansRange[1][3] && this.predictHistoryResult.rdyj <= this.kmeansRange[1][4]) {
        k2 = 'B3'
      }
      else if (this.predictHistoryResult.rdyj > this.kmeansRange[1][4] && this.predictHistoryResult.rdyj <= this.kmeansRange[1][5]) {
        k2 = 'B4'
      }
      // 冲任失调
      if (this.predictHistoryResult.crst >= this.kmeansRange[2][1] && this.predictHistoryResult.crst <= this.kmeansRange[2][2]) {
        k3 = 'C1'
      } else if (this.predictHistoryResult.crst > this.kmeansRange[2][2] && this.predictHistoryResult.crst <= this.kmeansRange[2][3]) {
        k3 = 'C2'
      }
      else if (this.predictHistoryResult.crst > this.kmeansRange[2][3] && this.predictHistoryResult.crst <= this.kmeansRange[2][4]) {
        k3 = 'C3'
      }
      else if (this.predictHistoryResult.crst > this.kmeansRange[2][4] && this.predictHistoryResult.crst <= this.kmeansRange[2][5]) {
        k3 = 'C4'
      }
      // 气血两虚
      if (this.predictHistoryResult.qxlx >= this.kmeansRange[3][1] && this.predictHistoryResult.qxlx <= this.kmeansRange[3][2]) {
        k4 = 'D1'
      } else if (this.predictHistoryResult.qxlx > this.kmeansRange[3][2] && this.predictHistoryResult.qxlx <= this.kmeansRange[3][3]) {
        k4 = 'D2'
      }
      else if (this.predictHistoryResult.qxlx > this.kmeansRange[3][3] && this.predictHistoryResult.qxlx <= this.kmeansRange[3][4]) {
        k4 = 'D3'
      }
      else if (this.predictHistoryResult.qxlx > this.kmeansRange[3][4] && this.predictHistoryResult.qxlx <= this.kmeansRange[3][5]) {
        k4 = 'D4'
      }
      // 脾胃虚弱
      if (this.predictHistoryResult.pwxr >= this.kmeansRange[4][1] && this.predictHistoryResult.pwxr <= this.kmeansRange[4][2]) {
        k5 = 'E1'
      } else if (this.predictHistoryResult.pwxr > this.kmeansRange[4][2] && this.predictHistoryResult.pwxr <= this.kmeansRange[4][3]) {
        k5 = 'E2'
      }
      else if (this.predictHistoryResult.pwxr > this.kmeansRange[4][3] && this.predictHistoryResult.pwxr <= this.kmeansRange[4][4]) {
        k5 = 'E3'
      }
      else if (this.predictHistoryResult.pwxr > this.kmeansRange[4][4] && this.predictHistoryResult.pwxr <= this.kmeansRange[4][5]) {
        k5 = 'E4'
      }
      // 肝肾阴虚
      if (this.predictHistoryResult.gsyx >= this.kmeansRange[5][1] && this.predictHistoryResult.gsyx <= this.kmeansRange[5][2]) {
        k6 = 'F1'
      } else if (this.predictHistoryResult.gsyx > this.kmeansRange[5][2] && this.predictHistoryResult.gsyx <= this.kmeansRange[5][3]) {
        k6 = 'F2'
      }
      else if (this.predictHistoryResult.gsyx > this.kmeansRange[5][3] && this.predictHistoryResult.gsyx <= this.kmeansRange[5][4]) {
        k6 = 'F3'
      }
      else if (this.predictHistoryResult.gsyx > this.kmeansRange[5][4] && this.predictHistoryResult.gsyx <= this.kmeansRange[5][5]) {
        k6 = 'F4'
      }
      var ks = [k1, k2, k3, k4, k5, k6]
      for (var k = 0; k < this.kmeansApriori.length; k++) {
        var str1 = this.kmeansApriori[k].result.substring(0, this.kmeansApriori[k].result.length - 3).split("_")
        var res1 = this.getResult(str1, ks)
        if (res1) {
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
          this.kmeansResult.push(krr)
        }
      }

      // 判断是否符合distant聚类的强关联规则
      var d1 = ''
      var d2 = ''
      var d3 = ''
      var d4 = ''
      var d5 = ''
      var d6 = ''
      // 肝气郁结
      if (this.predictHistoryResult.gqyj > this.distantRange[0][0] && this.predictHistoryResult.gqyj <= this.distantRange[0][1]) {
        d1 = 'A1'
      } else if (this.predictHistoryResult.gqyj > this.distantRange[0][1] && this.predictHistoryResult.gqyj <= this.distantRange[0][2]) {
        d1 = 'A2'
      }
      else if (this.predictHistoryResult.gqyj > this.distantRange[0][2] && this.predictHistoryResult.gqyj <= this.distantRange[0][3]) {
        d1 = 'A3'
      }
      else if (this.predictHistoryResult.gqyj > this.distantRange[0][3] && this.predictHistoryResult.gqyj <= this.distantRange[0][4]) {
        d1 = 'A4'
      }
      // 热毒蕴结
      if (this.predictHistoryResult.rdyj > this.distantRange[1][0] && this.predictHistoryResult.rdyj <= this.distantRange[1][1]) {
        d2 = 'B1'
      } else if (this.predictHistoryResult.rdyj > this.distantRange[1][1] && this.predictHistoryResult.rdyj <= this.distantRange[1][2]) {
        d2 = 'B2'
      }
      else if (this.predictHistoryResult.rdyj > this.distantRange[1][2] && this.predictHistoryResult.rdyj <= this.distantRange[1][3]) {
        d2 = 'B3'
      }
      else if (this.predictHistoryResult.rdyj > this.distantRange[1][3] && this.predictHistoryResult.rdyj <= this.distantRange[1][4]) {
        d2 = 'B4'
      }
      // 冲任失调
      if (this.predictHistoryResult.crst > this.distantRange[2][0] && this.predictHistoryResult.crst <= this.distantRange[2][1]) {
        d3 = 'C1'
      } else if (this.predictHistoryResult.crst > this.distantRange[2][1] && this.predictHistoryResult.crst <= this.distantRange[2][2]) {
        d3 = 'C2'
      }
      else if (this.predictHistoryResult.crst > this.distantRange[2][2] && this.predictHistoryResult.crst <= this.distantRange[2][3]) {
        d3 = 'C3'
      }
      else if (this.predictHistoryResult.crst > this.distantRange[2][3] && this.predictHistoryResult.crst <= this.distantRange[2][4]) {
        d3 = 'C4'
      }
      // 气血两虚
      if (this.predictHistoryResult.qxlx > this.distantRange[3][0] && this.predictHistoryResult.qxlx <= this.distantRange[3][1]) {
        d4 = 'D1'
      } else if (this.predictHistoryResult.qxlx > this.distantRange[3][1] && this.predictHistoryResult.qxlx <= this.distantRange[3][2]) {
        d4 = 'D2'
      }
      else if (this.predictHistoryResult.qxlx > this.distantRange[3][2] && this.predictHistoryResult.qxlx <= this.distantRange[3][3]) {
        d4 = 'D3'
      }
      else if (this.predictHistoryResult.qxlx > this.distantRange[3][3] && this.predictHistoryResult.qxlx <= this.distantRange[3][4]) {
        d4 = 'D4'
      }
      // 脾胃虚弱
      if (this.predictHistoryResult.pwxr > this.distantRange[4][0] && this.predictHistoryResult.pwxr <= this.distantRange[4][1]) {
        d5 = 'E1'
      } else if (this.predictHistoryResult.pwxr > this.distantRange[4][1] && this.predictHistoryResult.pwxr <= this.distantRange[4][1]) {
        d5 = 'E2'
      }
      else if (this.predictHistoryResult.pwxr > this.distantRange[4][1] && this.predictHistoryResult.pwxr <= this.distantRange[4][2]) {
        d5 = 'E3'
      }
      else if (this.predictHistoryResult.pwxr > this.distantRange[4][3] && this.predictHistoryResult.pwxr <= this.distantRange[4][4]) {
        d5 = 'E4'
      }
      // 肝肾阴虚
      if (this.predictHistoryResult.gsyx > this.distantRange[5][0] && this.predictHistoryResult.gsyx <= this.distantRange[5][1]) {
        d6 = 'F1'
      } else if (this.predictHistoryResult.gsyx > this.distantRange[5][1] && this.predictHistoryResult.gsyx <= this.distantRange[5][2]) {
        d6 = 'F2'
      }
      else if (this.predictHistoryResult.gsyx > this.distantRange[5][2] && this.predictHistoryResult.gsyx <= this.distantRange[5][3]) {
        d6 = 'F3'
      }
      else if (this.predictHistoryResult.gsyx > this.distantRange[5][3] && this.predictHistoryResult.gsyx <= this.distantRange[5][4]) {
        d6 = 'F4'
      }
      var ds = [d1, d2, d3, d4, d5, d6]
      for (var i = 0; i < this.distantApriori.length; i++) {
        var str2 = this.distantApriori[i].result.substring(0, this.distantApriori[i].result.length - 3).split("_")
        var res2 = this.getResult(str2, ds)
        if (res2) {
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
          this.distantResult.push(drr)
        }
      }

      // 判断是否符合frequency聚类的强关联规则
      var f1 = ''
      var f2 = ''
      var f3 = ''
      var f4 = ''
      var f5 = ''
      var f6 = ''
      // 肝气郁结
      if (this.predictHistoryResult.gqyj > this.frequencyRange[0][0] && this.predictHistoryResult.gqyj <= this.frequencyRange[0][1]) {
        f1 = 'A1'
      } else if (this.predictHistoryResult.gqyj > this.frequencyRange[0][1] && this.predictHistoryResult.gqyj <= this.frequencyRange[0][2]) {
        f1 = 'A2'
      }
      else if (this.predictHistoryResult.gqyj > this.frequencyRange[0][2] && this.predictHistoryResult.gqyj <= this.frequencyRange[0][3]) {
        f1 = 'A3'
      }
      else if (this.predictHistoryResult.gqyj > this.frequencyRange[0][3] && this.predictHistoryResult.gqyj <= this.frequencyRange[0][4]) {
        f1 = 'A4'
      }
      // 热毒蕴结
      if (this.rfyj > this.frequencyRange[1][0] && this.rfyj <= this.frequencyRange[1][1]) {
        f2 = 'B1'
      } else if (this.rfyj > this.frequencyRange[1][1] && this.rfyj <= this.frequencyRange[1][2]) {
        f2 = 'B2'
      }
      else if (this.rfyj > this.frequencyRange[1][2] && this.rfyj <= this.frequencyRange[1][3]) {
        f2 = 'B3'
      }
      else if (this.rfyj > this.frequencyRange[1][3] && this.rfyj <= this.frequencyRange[1][4]) {
        f2 = 'B4'
      }
      // 冲任失调
      if (this.predictHistoryResult.crst > this.frequencyRange[2][0] && this.predictHistoryResult.crst <= this.frequencyRange[2][1]) {
        f3 = 'C1'
      } else if (this.predictHistoryResult.crst > this.frequencyRange[2][1] && this.predictHistoryResult.crst <= this.frequencyRange[2][2]) {
        f3 = 'C2'
      }
      else if (this.predictHistoryResult.crst > this.frequencyRange[2][2] && this.predictHistoryResult.crst <= this.frequencyRange[2][3]) {
        f3 = 'C3'
      }
      else if (this.predictHistoryResult.crst > this.frequencyRange[2][3] && this.predictHistoryResult.crst <= this.frequencyRange[2][4]) {
        f3 = 'C4'
      }
      // 气血两虚
      if (this.predictHistoryResult.qxlx > this.frequencyRange[3][0] && this.predictHistoryResult.qxlx <= this.frequencyRange[3][1]) {
        f4 = 'D1'
      } else if (this.predictHistoryResult.qxlx > this.frequencyRange[3][1] && this.predictHistoryResult.qxlx <= this.frequencyRange[3][2]) {
        f4 = 'D2'
      }
      else if (this.predictHistoryResult.qxlx > this.frequencyRange[3][2] && this.predictHistoryResult.qxlx <= this.frequencyRange[3][3]) {
        f4 = 'D3'
      }
      else if (this.predictHistoryResult.qxlx > this.frequencyRange[3][3] && this.predictHistoryResult.qxlx <= this.frequencyRange[3][4]) {
        f4 = 'D4'
      }
      // 脾胃虚弱
      if (this.predictHistoryResult.pwxr > this.frequencyRange[4][0] && this.predictHistoryResult.pwxr <= this.frequencyRange[4][1]) {
        f5 = 'E1'
      } else if (this.predictHistoryResult.pwxr > this.frequencyRange[4][1] && this.predictHistoryResult.pwxr <= this.frequencyRange[4][1]) {
        f5 = 'E2'
      }
      else if (this.predictHistoryResult.pwxr > this.frequencyRange[4][1] && this.predictHistoryResult.pwxr <= this.frequencyRange[4][2]) {
        f5 = 'E3'
      }
      else if (this.predictHistoryResult.pwxr > this.frequencyRange[4][3] && this.predictHistoryResult.pwxr <= this.frequencyRange[4][4]) {
        f5 = 'E4'
      }
      // 肝肾阴虚
      if (this.predictHistoryResult.gsyx > this.frequencyRange[5][0] && this.predictHistoryResult.gsyx <= this.frequencyRange[5][1]) {
        f6 = 'F1'
      } else if (this.predictHistoryResult.gsyx > this.frequencyRange[5][1] && this.predictHistoryResult.gsyx <= this.frequencyRange[5][2]) {
        f6 = 'F2'
      }
      else if (this.predictHistoryResult.gsyx > this.frequencyRange[5][2] && this.predictHistoryResult.gsyx <= this.frequencyRange[5][3]) {
        f6 = 'F3'
      }
      else if (this.predictHistoryResult.gsyx > this.frequencyRange[5][3] && this.predictHistoryResult.gsyx <= this.frequencyRange[5][4]) {
        f6 = 'F4'
      }
      var fs = [f1, f2, f3, f4, f5, f6]
      for (var n = 0; n < this.frequencyApriori.length; n++) {
        var str3 = this.frequencyApriori[n].result.substring(0, this.frequencyApriori[n].result.length - 3).split("_")
        var res3 = this.getResult(str3, fs)
        if (res3) {
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
          this.frequencyResult.push(frr)
        }
      }
    },
    // 判断一个数组是否为另一个数组的子集
    getResult (arr1, arr2) {
      return arr1.every(item => {
        return arr2.includes(item);
      })
    },
  },
  created () {
    this.getPredictHistory()
  },
  updated () {
    // 修改、删除后，重新加载数据
    this.getPredictHistory()
  },
  computed: {
    id () {
      return localStorage.getItem('id') || this.$store.state.id || ''
    },
    kmeansRange () {
      return JSON.parse(localStorage.getItem('kmeansRange'))
    },
    kmeansApriori () {
      return JSON.parse(localStorage.getItem('kmeansApriori'))

    },
    distantRange () {
      return JSON.parse(localStorage.getItem('distantRange'))
    },
    distantApriori () {
      return JSON.parse(localStorage.getItem('distantApriori'))

    },
    frequencyRange () {
      return JSON.parse(localStorage.getItem('frequencyRange'))
    },
    frequencyApriori () {
      return JSON.parse(localStorage.getItem('frequencyApriori'))
    },
  }
}
</script>

<style lang="less">
.predictHistory {

  // 列表，显示status=1的数据
  .predictHistory-content {
    width: 100%;
    border: 1px solid rgb(214, 204, 204);
    border-radius: 10px;
    padding: 10px 10px 0 10px;
    margin-bottom: 50px;
    font-size: 14px;

    .predictHistory-top {
      font-size: 12px;
      font-weight: lighter;
      margin-bottom: 5px;
    }

    .predictHistory-operation {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .van-dialog {
    padding: 10px;
    font-size: 16px;

    .auditedBox {
      padding: 10px;
      height: 400px;
      overflow-x: hidden;
      overflow-y: auto;

      .item-2 {
        margin-left: 40px;
      }

      .item {
        margin-top: 20px;

        div {
          margin-top: 10px;

          span {
            font-weight: bold;
          }
        }
      }
    }
  }

  th {
    font-weight: 400;
  }
}
</style>