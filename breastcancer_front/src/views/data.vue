<template>
  <div class="data">
    <!-- 查询数据 -->
    <div class="searchData">
      <span>查询数据</span>
      <div>
        <span>id：</span>
        <input type="text" v-model.trim="searchContent">
      </div>
      <button type="button" class="btn btn-primary" @click="searchById">查询</button>
    </div>

    <!-- 数据展示 -->
    <!-- 如果showList为true，表示展示所有数据 -->
    <div class="showData" v-if="showList">
      <div class="showData-top">
        <span>数据列表</span>
        <div>（共{{ this.total }}条数据）</div>
        <button type="button" class="btn btn-primary" @click="addNewData" v-if="this.isAdmin == 1">新增数据</button>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>编号</th>
            <th>id</th>
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
          <tr v-for="(item, index) in this.dataList" :key="index">
            <td>{{ (this.currentPage - 1) * 10 + index + 1 }}</td>
            <td>{{ item.bcDataId }}</td>
            <td>{{ item.gqyj }}</td>
            <td>{{ item.rdyj }}</td>
            <td>{{ item.crst }}</td>
            <td>{{ item.qxlx }}</td>
            <td>{{ item.pwxr }}</td>
            <td>{{ item.gsyx }}</td>
            <td>{{ item.TNM }}</td>
            <td class="edit">
              <span @click="openDialog(item.bcDataId)">查看</span>
              <span @click="edit(item.bcDataId)" v-if="this.isAdmin == 1">修改</span>
              <span @click="deleteData(item.bcDataId)" v-if="this.isAdmin == 1">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 展示查询结果 -->
    <div class="showData" v-else>
      <h6>数据列表</h6>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>编号</th>
            <th>id</th>
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
            <td>1</td>
            <td>{{ this.resultList.bcDataId }}</td>
            <td>{{ this.resultList.gqyj }}</td>
            <td>{{ this.resultList.rdyj }}</td>
            <td>{{ this.resultList.crst }}</td>
            <td>{{ this.resultList.qxlx }}</td>
            <td>{{ this.resultList.pwxr }}</td>
            <td>{{ this.resultList.gsyx }}</td>
            <td>{{ this.resultList.TNM }}</td>
            <td class="edit">
              <span @click="openDialog(this.resultList.bcDataId)">查看</span>
              <span @click="edit(this.resultList.bcDataId)" v-if="this.isAdmin == 1">修改</span>
              <span @click="deleteData(this.resultList.bcDataId)"
                v-if=" this.isAdmin == 1">删除</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- 分页插件 -->
    <!-- v-model——绑定当前页码 -->
    <!-- mode——显示模式。simple/multi -->
    <!-- prev-text——上一页按钮文字 -->
    <!-- next-text——下一页按钮文字 -->
    <!-- page-count——总页数 -->
    <!-- total-items——总记录数 -->
    <!-- items-per-page——每页记录数 -->
    <!-- show-page-size——显示的页码个数 -->
    <!-- force-ellipses——是否显示省略号 -->
    <!-- change——页码改变时触发 -->
    <!-- v-if="showList"——展示所有数据列表和分页插件 -->
    <van-pagination v-model="currentPage" :page-count="Math.ceil(total / 10)" mode="simple" :items-per-page="10"
      v-if="showList" />

    <!-- 查看弹出框 -->
    <van-dialog v-model:show="showDialog" title="查看数据" show-cancel-button width="500px" heigh="2000px">
      <div class="auditedBox">
        <div>
          <span>肝气郁结证型得分(满分40)：{{ this.editData.gqyj }}</span>
          <span class="item-2">证型系数为：{{ this.resultList.gqyj }}</span>
        </div>
        <div>
          <span>热毒蕴结证型得分(满分40)：{{ this.editData.rdyj }}</span>
          <span class="item-2">证型系数为：{{ this.resultList.rdyj }}</span>
        </div>
        <div>
          <span>冲任失调证型得分(满分40)：{{ this.editData.crst }}</span>
          <span class="item-2">证型系数为：{{ this.resultList.crst }}</span>
        </div>
        <div>
          <span>气血两虚证型得分(满分40)：{{ this.editData.qxlx }}</span>
          <span class="item-2">证型系数为：{{ this.resultList.qxlx }}</span>
        </div>
        <div>
          <span>脾胃虚弱证型得分(满分40)：{{ this.editData.pwxr }}</span>
          <span class="item-2">证型系数为：{{ this.resultList.pwxr }}</span>
        </div>
        <div>
          <span>肝肾阴虚证型得分(满分40)：{{ this.editData.gsyx }}</span>
          <span class="item-2">证型系数为：{{ this.resultList.gsyx }}</span>
        </div>
        <div>
          <span>TNM分期：</span>
          <span>{{ this.resultList.TNM }}</span>
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

    <!-- 编辑数据弹出框 -->
    <van-dialog v-model:show="showEditDialog" title="编辑数据" show-cancel-button width="500px" @confirm="submitEditData">
      <div class="addDataBox">
        <div class="addDataBox-item">
          <span>肝气郁结证型得分(满分40)：</span>
          <input type="text" v-model.trim="editData.gqyj">
          <span>证型系数为：{{ (this.editData.gqyj / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>热毒蕴结证型得分(满分44)：</span>
          <input type="text" v-model.trim="editData.rdyj">
          <span>证型系数为：{{ (this.editData.rdyj / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>冲任失调证型得分(满分41)：</span>
          <input type="text" v-model.trim="editData.crst">
          <span>证型系数为：{{ (this.editData.crst / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>气血两虚证型得分(满分43)：</span>
          <input type="text" v-model.trim="editData.qxlx">
          <span>证型系数为：{{ (this.editData.qxlx / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>脾胃虚弱证型得分(满分43)：</span>
          <input type="text" v-model.trim="editData.pwxr">
          <span>证型系数为：{{ (this.editData.pwxr / 40).toFixed(3) }}</span>
        </div>
        <div class="addDataBox-item">
          <span>肝肾阴虚证型得分(满分38)：</span>
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

    <!-- 添加数据弹出框 -->
    <van-dialog v-model:show="addNewDataDialog" title="添加数据" show-cancel-button width="500px" @confirm="submitNewData"
      @cancel="unSubmitNewData">
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
    </van-dialog>
  </div>
</template>

<script>
import request from '../request/request'
export default {
  name: 'data',
  data () {
    return {
      // 10条数据
      dataList: [],
      // 当前页数
      currentPage: 1,
      // 一共有多少条数据
      total: '',
      // 所有数据
      allData: [],
      // 查询的内容
      searchContent: '',
      // true展示所有数据列表和分页插件，false展示结果列表
      showList: true,
      // 查询结果
      resultList: [],
      // 添加数据的弹出框——管理员
      addNewDataDialog: false,
      // 查看弹出框
      showDialog: false,
      // 添加的数据——管理员
      gqyj: '',
      rdyj: '',
      crst: '',
      qxlx: '',
      pwxr: '',
      gsyx: '',
      TNM: '',
      // 修改弹出框——管理员
      showEditDialog: false,
      // 修改弹出框的数据——管理员
      editData: {
        bcDataId: '',
        gqyj: '',
        rdyj: '',
        crst: '',
        qxlx: '',
        pwxr: '',
        gsyx: '',
        TNM: '',
      },
      // 关联分析的结果解析
      kmeansResult: [],
      distantResult: [],
      frequencyResult: []
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
    // 获取所有未被删除的数据
    getAllData () {
      // 管理员——所有系统数据和用户数据
      if (this.isAdmin == 1) {
        request.get('/api/adminGetAllData').then(res => {
          if (res.status === 1) {
            var msg = res.message
            alert(msg)
          } else if (res.status === 0) {
            this.allData = res.data
            this.total = this.allData.length
          }
        })
      } else {
        // 用户——根据用户id获取用户自己的数据和系统的前100条数据
        request.get('/api/userGetAllData').then(res => {
          if (res.status === 1) {
            var msg = res.message
            alert(msg)
          } else if (res.status === 0) {
            this.allData = res.data
            this.total = this.allData.length
          }
        })
      }

    },
    // 获取10条未被删除的数据
    showData () {
      // 管理员——所有系统数据和用户数据的10条数据——降序
      if (this.isAdmin == 1) {
        request.get('/api/adminGetDataset/' + (this.currentPage - 1) * 10).then(res => {
          if (res.status === 1) {
            var msg = res.message
            alert(msg)
          } else if (res.status === 0) {
            this.dataList = res.data
          }
        })
      } else {
        // 用户——根据用户id获取用户自己的数据和系统的10条数据
        request.get('/api/userGetDataset/' + (this.currentPage - 1) * 10).then(res => {
          if (res.status === 1) {
            var msg = res.message
            alert(msg)
          } else if (res.status === 0) {
            this.dataList = res.data
          }
        })
      }
    },
    // 管理员根据bcDataId删除数据
    deleteData (bcDataId) {
      request.post('/api/adminDeleteData', { bcDataId: bcDataId }).then(res => {
        if (res.status === 1) {
          var msg = res.message
          alert(msg)
        } else if (res.status === 0) {
          alert('删除数据成功！')
          // 重新加载10条数据
          this.showData()
          // 显示所有数据列表
          this.showList = true
        }
      })
    },
    // 根据id获取未被删除的用户数据
    search (bcDataId) {
      this.kmeansResult = []
      this.distantResult = []
      this.frequencyResult = []
      this.resultList = []
      // 管理员——可以查询任意数据
      if (this.isAdmin == 1) {
        let promise1 = new Promise((resolve, reject) => {
          request.get('/api/adminGetDataById/' + bcDataId).then(res => {
            if (res.status === 0) {
              resolve(res)
            } else {
              reject(res)
            }
          })
        }).then(res => {
          this.resultList = res.data
          // 清空搜索框
          this.searchContent = ''
          // 将数据显示在编辑弹出框的input中
          this.editData.bcDataId = this.resultList.bcDataId
          this.editData.gqyj = Math.round(this.resultList.gqyj * 40)
          this.editData.rdyj = Math.round(this.resultList.rdyj * 40)
          this.editData.crst = Math.round(this.resultList.crst * 40)
          this.editData.qxlx = Math.round(this.resultList.qxlx * 40)
          this.editData.pwxr = Math.round(this.resultList.pwxr * 40)
          this.editData.gsyx = Math.round(this.resultList.gsyx * 40)
          this.editData.TNM = this.resultList.TNM
          // 组装关联结果说明的语句
          this.getAprioriResult()
        })
          .catch(res => {
            var msg = res.message
            alert(msg)
            // 清空搜索框
            this.searchContent = ''
            // 显示所有数据列表和分页插件
            this.showList = true
          })
        return promise1
      }
      else {
        // 用户——只能查询自己的数据和系统的前100条数据
        let promise5 = new Promise((resolve, reject) => {
          request.get('/api/userGetDataById/' + bcDataId).then(res => {
            if (res.status === 0) {
              resolve(res)
            } else {
              reject(res)
            }
          })
        }).then(res => {
          this.resultList = res.data
          // 清空搜索框
          this.searchContent = ''
          // 将数据显示在编辑弹出框的input中
          this.editData.bcDataId = this.resultList.bcDataId
          this.editData.gqyj = Math.round(this.resultList.gqyj * 40)
          this.editData.rdyj = Math.round(this.resultList.rdyj * 40)
          this.editData.crst = Math.round(this.resultList.crst * 40)
          this.editData.qxlx = Math.round(this.resultList.qxlx * 40)
          this.editData.pwxr = Math.round(this.resultList.pwxr * 40)
          this.editData.gsyx = Math.round(this.resultList.gsyx * 40)
          this.editData.TNM = this.resultList.TNM
          // 组装关联结果说明的语句
          this.getAprioriResult()
        })
          .catch(res => {
            var msg = res.message
            alert(msg)
            // 清空搜索框
            this.searchContent = ''
            // 显示所有数据列表和分页插件
            this.showList = true
          })
        return promise5
      }
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
      if (this.resultList.gqyj >= this.kmeansRange[0][1] && this.resultList.gqyj <= this.kmeansRange[0][2]) {
        k1 = 'A1'
      } else if (this.resultList.gqyj > this.kmeansRange[0][2] && this.resultList.gqyj <= this.kmeansRange[0][3]) {
        k1 = 'A2'
      }
      else if (this.resultList.gqyj > this.kmeansRange[0][3] && this.resultList.gqyj <= this.kmeansRange[0][4]) {
        k1 = 'A3'
      }
      else if (this.resultList.gqyj > this.kmeansRange[0][4] && this.resultList.gqyj <= this.kmeansRange[0][5]) {
        k1 = 'A4'
      }
      // 热毒蕴结
      if (this.resultList.rkyj >= this.kmeansRange[1][1] && this.resultList.rkyj <= this.kmeansRange[1][2]) {
        k2 = 'B1'
      } else if (this.resultList.rkyj > this.kmeansRange[1][2] && this.resultList.rkyj <= this.kmeansRange[1][3]) {
        k2 = 'B2'
      }
      else if (this.resultList.rkyj > this.kmeansRange[1][3] && this.resultList.rkyj <= this.kmeansRange[1][4]) {
        k2 = 'B3'
      }
      else if (this.resultList.rkyj > this.kmeansRange[1][4] && this.resultList.rkyj <= this.kmeansRange[1][5]) {
        k2 = 'B4'
      }
      // 冲任失调
      if (this.resultList.crst >= this.kmeansRange[2][1] && this.resultList.crst <= this.kmeansRange[2][2]) {
        k3 = 'C1'
      } else if (this.resultList.crst > this.kmeansRange[2][2] && this.resultList.crst <= this.kmeansRange[2][3]) {
        k3 = 'C2'
      }
      else if (this.resultList.crst > this.kmeansRange[2][3] && this.resultList.crst <= this.kmeansRange[2][4]) {
        k3 = 'C3'
      }
      else if (this.resultList.crst > this.kmeansRange[2][4] && this.resultList.crst <= this.kmeansRange[2][5]) {
        k3 = 'C4'
      }
      // 气血两虚
      if (this.resultList.qxlx >= this.kmeansRange[3][1] && this.resultList.qxlx <= this.kmeansRange[3][2]) {
        k4 = 'D1'
      } else if (this.resultList.qxlx > this.kmeansRange[3][2] && this.resultList.qxlx <= this.kmeansRange[3][3]) {
        k4 = 'D2'
      }
      else if (this.resultList.qxlx > this.kmeansRange[3][3] && this.resultList.qxlx <= this.kmeansRange[3][4]) {
        k4 = 'D3'
      }
      else if (this.resultList.qxlx > this.kmeansRange[3][4] && this.resultList.qxlx <= this.kmeansRange[3][5]) {
        k4 = 'D4'
      }
      // 脾胃虚弱
      if (this.resultList.pwxr >= this.kmeansRange[4][1] && this.resultList.pwxr <= this.kmeansRange[4][2]) {
        k5 = 'E1'
      } else if (this.resultList.pwxr > this.kmeansRange[4][2] && this.resultList.pwxr <= this.kmeansRange[4][3]) {
        k5 = 'E2'
      }
      else if (this.resultList.pwxr > this.kmeansRange[4][3] && this.resultList.pwxr <= this.kmeansRange[4][4]) {
        k5 = 'E3'
      }
      else if (this.resultList.pwxr > this.kmeansRange[4][4] && this.resultList.pwxr <= this.kmeansRange[4][5]) {
        k5 = 'E4'
      }
      // 肝肾阴虚
      if (this.resultList.gsyx >= this.kmeansRange[5][1] && this.resultList.gsyx <= this.kmeansRange[5][2]) {
        k6 = 'F1'
      } else if (this.resultList.gsyx > this.kmeansRange[5][2] && this.resultList.gsyx <= this.kmeansRange[5][3]) {
        k6 = 'F2'
      }
      else if (this.resultList.gsyx > this.kmeansRange[5][3] && this.resultList.gsyx <= this.kmeansRange[5][4]) {
        k6 = 'F3'
      }
      else if (this.resultList.gsyx > this.kmeansRange[5][4] && this.resultList.gsyx <= this.kmeansRange[5][5]) {
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
      if (this.resultList.gqyj > this.distantRange[0][0] && this.resultList.gqyj <= this.distantRange[0][1]) {
        d1 = 'A1'
      } else if (this.resultList.gqyj > this.distantRange[0][1] && this.resultList.gqyj <= this.distantRange[0][2]) {
        d1 = 'A2'
      }
      else if (this.resultList.gqyj > this.distantRange[0][2] && this.resultList.gqyj <= this.distantRange[0][3]) {
        d1 = 'A3'
      }
      else if (this.resultList.gqyj > this.distantRange[0][3] && this.resultList.gqyj <= this.distantRange[0][4]) {
        d1 = 'A4'
      }
      // 热毒蕴结
      if (this.resultList.rdyj > this.distantRange[1][0] && this.resultList.rdyj <= this.distantRange[1][1]) {
        d2 = 'B1'
      } else if (this.resultList.rdyj > this.distantRange[1][1] && this.resultList.rdyj <= this.distantRange[1][2]) {
        d2 = 'B2'
      }
      else if (this.resultList.rdyj > this.distantRange[1][2] && this.resultList.rdyj <= this.distantRange[1][3]) {
        d2 = 'B3'
      }
      else if (this.resultList.rdyj > this.distantRange[1][3] && this.resultList.rdyj <= this.distantRange[1][4]) {
        d2 = 'B4'
      }
      // 冲任失调
      if (this.resultList.crst > this.distantRange[2][0] && this.resultList.crst <= this.distantRange[2][1]) {
        d3 = 'C1'
      } else if (this.resultList.crst > this.distantRange[2][1] && this.resultList.crst <= this.distantRange[2][2]) {
        d3 = 'C2'
      }
      else if (this.resultList.crst > this.distantRange[2][2] && this.resultList.crst <= this.distantRange[2][3]) {
        d3 = 'C3'
      }
      else if (this.resultList.crst > this.distantRange[2][3] && this.resultList.crst <= this.distantRange[2][4]) {
        d3 = 'C4'
      }
      // 气血两虚
      if (this.resultList.qxlx > this.distantRange[3][0] && this.resultList.qxlx <= this.distantRange[3][1]) {
        d4 = 'D1'
      } else if (this.resultList.qxlx > this.distantRange[3][1] && this.resultList.qxlx <= this.distantRange[3][2]) {
        d4 = 'D2'
      }
      else if (this.resultList.qxlx > this.distantRange[3][2] && this.resultList.qxlx <= this.distantRange[3][3]) {
        d4 = 'D3'
      }
      else if (this.resultList.qxlx > this.distantRange[3][3] && this.resultList.qxlx <= this.distantRange[3][4]) {
        d4 = 'D4'
      }
      // 脾胃虚弱
      if (this.resultList.pwxr > this.distantRange[4][0] && this.resultList.pwxr <= this.distantRange[4][1]) {
        d5 = 'E1'
      } else if (this.resultList.pwxr > this.distantRange[4][1] && this.resultList.pwxr <= this.distantRange[4][1]) {
        d5 = 'E2'
      }
      else if (this.resultList.pwxr > this.distantRange[4][1] && this.resultList.pwxr <= this.distantRange[4][2]) {
        d5 = 'E3'
      }
      else if (this.resultList.pwxr > this.distantRange[4][3] && this.resultList.pwxr <= this.distantRange[4][4]) {
        d5 = 'E4'
      }
      // 肝肾阴虚
      if (this.resultList.gsyx > this.distantRange[5][0] && this.resultList.gsyx <= this.distantRange[5][1]) {
        d6 = 'F1'
      } else if (this.resultList.gsyx > this.distantRange[5][1] && this.resultList.gsyx <= this.distantRange[5][2]) {
        d6 = 'F2'
      }
      else if (this.resultList.gsyx > this.distantRange[5][2] && this.resultList.gsyx <= this.distantRange[5][3]) {
        d6 = 'F3'
      }
      else if (this.resultList.gsyx > this.distantRange[5][3] && this.resultList.gsyx <= this.distantRange[5][4]) {
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
      if (this.resultList.gqyj > this.frequencyRange[0][0] && this.resultList.gqyj <= this.frequencyRange[0][1]) {
        f1 = 'A1'
      } else if (this.resultList.gqyj > this.frequencyRange[0][1] && this.resultList.gqyj <= this.frequencyRange[0][2]) {
        f1 = 'A2'
      }
      else if (this.resultList.gqyj > this.frequencyRange[0][2] && this.resultList.gqyj <= this.frequencyRange[0][3]) {
        f1 = 'A3'
      }
      else if (this.resultList.gqyj > this.frequencyRange[0][3] && this.resultList.gqyj <= this.frequencyRange[0][4]) {
        f1 = 'A4'
      }
      // 热毒蕴结
      if (this.resultList.rfyj > this.frequencyRange[1][0] && this.resultList.rfyj <= this.frequencyRange[1][1]) {
        f2 = 'B1'
      } else if (this.resultList.rfyj > this.frequencyRange[1][1] && this.resultList.rfyj <= this.frequencyRange[1][2]) {
        f2 = 'B2'
      }
      else if (this.resultList.rfyj > this.frequencyRange[1][2] && this.resultList.rfyj <= this.frequencyRange[1][3]) {
        f2 = 'B3'
      }
      else if (this.resultList.rfyj > this.frequencyRange[1][3] && this.resultList.rfyj <= this.frequencyRange[1][4]) {
        f2 = 'B4'
      }
      // 冲任失调
      if (this.resultList.crst > this.frequencyRange[2][0] && this.resultList.crst <= this.frequencyRange[2][1]) {
        f3 = 'C1'
      } else if (this.resultList.crst > this.frequencyRange[2][1] && this.resultList.crst <= this.frequencyRange[2][2]) {
        f3 = 'C2'
      }
      else if (this.resultList.crst > this.frequencyRange[2][2] && this.resultList.crst <= this.frequencyRange[2][3]) {
        f3 = 'C3'
      }
      else if (this.resultList.crst > this.frequencyRange[2][3] && this.resultList.crst <= this.frequencyRange[2][4]) {
        f3 = 'C4'
      }
      // 气血两虚
      if (this.resultList.qxlx > this.frequencyRange[3][0] && this.resultList.qxlx <= this.frequencyRange[3][1]) {
        f4 = 'D1'
      } else if (this.resultList.qxlx > this.frequencyRange[3][1] && this.resultList.qxlx <= this.frequencyRange[3][2]) {
        f4 = 'D2'
      }
      else if (this.resultList.qxlx > this.frequencyRange[3][2] && this.resultList.qxlx <= this.frequencyRange[3][3]) {
        f4 = 'D3'
      }
      else if (this.resultList.qxlx > this.frequencyRange[3][3] && this.resultList.qxlx <= this.frequencyRange[3][4]) {
        f4 = 'D4'
      }
      // 脾胃虚弱
      if (this.resultList.pwxr > this.frequencyRange[4][0] && this.resultList.pwxr <= this.frequencyRange[4][1]) {
        f5 = 'E1'
      } else if (this.resultList.pwxr > this.frequencyRange[4][1] && this.resultList.pwxr <= this.frequencyRange[4][1]) {
        f5 = 'E2'
      }
      else if (this.resultList.pwxr > this.frequencyRange[4][1] && this.resultList.pwxr <= this.frequencyRange[4][2]) {
        f5 = 'E3'
      }
      else if (this.resultList.pwxr > this.frequencyRange[4][3] && this.resultList.pwxr <= this.frequencyRange[4][4]) {
        f5 = 'E4'
      }
      // 肝肾阴虚
      if (this.resultList.gsyx > this.frequencyRange[5][0] && this.resultList.gsyx <= this.frequencyRange[5][1]) {
        f6 = 'F1'
      } else if (this.resultList.gsyx > this.frequencyRange[5][1] && this.resultList.gsyx <= this.frequencyRange[5][2]) {
        f6 = 'F2'
      }
      else if (this.resultList.gsyx > this.frequencyRange[5][2] && this.resultList.gsyx <= this.frequencyRange[5][3]) {
        f6 = 'F3'
      }
      else if (this.resultList.gsyx > this.frequencyRange[5][3] && this.resultList.gsyx <= this.frequencyRange[5][4]) {
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
    // 点击查询按钮
    // 作用——动态切换全部数据列表和结果列表
    // 如果搜索内容为空，则显示所有数据列表和分页插件
    // 如果不为空，则显示结果数列表，并且根据搜索内容获取对应数据
    searchById () {
      if (!this.searchContent) {
        this.showList = true
      } else {
        if (!this.kmeansRange || !this.kmeansApriori || !this.distantRange || !this.distantApriori || !this.frequencyRange || !this.frequencyApriori) {
          alert('进行数据操作前，请先运行下面的三个算法，以获取结果！')
          this.searchContent=''
        } else {
          this.showList = false
          this.search(this.searchContent)
        }
        
      }
    },
    // 新增数据——管理员
    submitNewData () {
      // 将数据转换为系数
      var gqyj = (this.gqyj / 40).toFixed(3)
      var rdyj = (this.rdyj / 40).toFixed(3)
      var crst = (this.crst / 40).toFixed(3)
      var qxlx = (this.qxlx / 40).toFixed(3)
      var pwxr = (this.pwxr / 40).toFixed(3)
      var gsyx = (this.gsyx / 40).toFixed(3)
      // 数据不能为空
      if (!gqyj || !rdyj || !crst || !qxlx || !pwxr || !gsyx || !this.TNM) {
        alert('添加的数据不能为空！')
      } else {
        request.post('/api/adminAddDataset', { gqyj: gqyj, rdyj: rdyj, crst: crst, qxlx: qxlx, pwxr: pwxr, gsyx: gsyx, TNM: this.TNM }).then(res => {
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
            // 重新加载10条数据
            this.showData()
            // 显示所有数据列表以及分组插件
            this.showList = true
          }
        })
      }
    },
    // 取消添加数据
    // 清空表单
    unSubmitNewData () {
      this.gqyj = ''
      this.rdyj = ''
      this.crst = ''
      this.qxlx = ''
      this.pwxr = ''
      this.gsyx = ''
      this.TNM = ''
    },
    // 显示编辑弹出框——管理员
    // 根据bcDataId获取该条数据
    edit (bcDataId) {
      if (!this.kmeansRange || !this.kmeansApriori || !this.distantRange || !this.distantApriori || !this.frequencyRange || !this.frequencyApriori) {
        alert('进行数据操作前，请先运行下面的三个算法，以获取结果！')
      } else {
        this.showEditDialog = true
        this.search(bcDataId)
      }
    },
    // 提交编辑弹出框中的数据——管理员
    // 成功,重新滚加载10条数据,重新显示结果列表中的数据
    submitEditData () {
       if (!this.editData.gqyj || !this.editData.rdyj || !this.editData.crst || !this.editData.qxlx || !this.editData.pwxr || !this.editData.gsyx || !this.editData.TNM) {
        alert('数据不能为空')
      } else {
        // 将数据转换为系数
        var gqyj = (this.editData.gqyj / 40).toFixed(3)
        var rdyj = (this.editData.rdyj / 40).toFixed(3)
        var crst = (this.editData.crst / 40).toFixed(3)
        var qxlx = (this.editData.qxlx / 40).toFixed(3)
        var pwxr = (this.editData.pwxr / 40).toFixed(3)
        var gsyx = (this.editData.gsyx / 40).toFixed(3)
        // 数据不得为空
        if (!gqyj || !rdyj || !crst || !qxlx || !pwxr || !gsyx || !this.editData.TNM) {
          alert('数据不能为空！')
        } else {
          request.post('/api/adminUpdateDataset', { gqyj: gqyj, rdyj: rdyj, crst: crst, qxlx: qxlx, pwxr: pwxr, gsyx: gsyx, TNM: this.editData.TNM, bcDataId: this.resultList.bcDataId }).then(res => {
            if (res.status === 1) {
              var msg = res.message
              alert(msg)
            } else if (res.status === 0) {
              alert('修改数据成功')
              // 重新滚加载10条数据
              this.showData()
              // 重新显示结果列表中的数据
              this.search(this.editData.bcDataId)
            }
          })
        }
      }
    },
    // 显示查看弹出框
    // 根据id获取对应的数据
    openDialog (id) {
      if (!this.kmeansRange || !this.kmeansApriori || !this.distantRange || !this.distantApriori || !this.frequencyRange || !this.frequencyApriori) {
        alert('进行查看数据前，请先运行下面的三个算法，以获取结果！')
      } else {
        this.showDialog = true
        this.search(id)
      }

    },
    // 判断一个数组是否为另一个数组的子集
    getResult (arr1, arr2) {
      return arr1.every(item => {
        return arr2.includes(item);
      })
    },
    // 添加数据弹出框——管理员
    addNewData () {
      this.addNewDataDialog = true
    }
  },
  // 侦听器
  watch: {
    // currentPage发生变化，则重新加载数据以及更改total
    currentPage () {
      this.showData()
      this.getAllData()
    },
  },
  computed: {
    isAdmin () {
      return localStorage.getItem('isAdmin') || this.$store.state.isAdmin || ''
    },
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
.data {
  font-size: 14px;

  .btn {
    margin-left: 20px;
    font-size: 12px;
  }

  //  查询数据
  .searchData {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    margin-bottom: 30px;

    >span {
      font-size: 18px;
    }

    div {
      margin-left: 20px;
    }


  }

  // 数据展示
  .showData-top {
    width: 100%;
    display: flex;
    align-items: center;

    >span {
      font-size: 18px;
    }

    >div {
      font-size: 12px;
    }
  }

  .edit {
    width: 150px;
    display: flex;
    justify-content: space-between;
  }

  th {
    font-weight: 400;
    font-size: 12px;
  }

  tr {
    height: 50px;
    line-height: 50px;
  }

  // 查看弹出框
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

    // 编辑弹出框
    .addDataBox {
      width: 100%;
      font-size: 14px;
      margin-bottom: 12px;

      .addDataBox-item {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      .addDataBox-select {
        width: 350px;
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 30px;
        justify-content: space-around;

        select {
          width: 100px;
        }
      }
    }
  }
}
</style>