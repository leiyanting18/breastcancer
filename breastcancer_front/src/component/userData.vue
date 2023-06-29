<template>
    <div class="dataView">
        <!-- 查询用户 -->
        <div class="searchData">
            <span>查询用户</span>
            <div>
                <span>id：</span>
                <input type="text" v-model.trim="searchContent">
            </div>
            <button type="button" class="btn btn-primary" @click="searchById">查询</button>
        </div>

        <!-- 用户数据展示 -->
        <div class="showData" v-if="showList">
            <div class="showData-top">
                <span>用户列表</span>
                <div>（共{{ this.total }}条数据）</div>
                <button type="button" class="btn btn-primary" @click="this.showDialog = true">新增用户</button>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>id</th>
                        <th>用户名</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in this.dataList" :key="index">
                        <td>{{ (this.currentPage - 1) * 10 + index + 1 }}</td>
                        <td>{{ item.id }}</td>
                        <td>{{ item.username }}</td>
                        <td>
                            <span @click="edit(item.id)" style="margin-right: 50px;">修改</span>
                            <span @click="deleteData(item.id)">删除</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 展示查询结果 -->
        <div class="showData" v-else>
            <h6>用户列表</h6>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>id</th>
                        <th>用户名</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{{ this.resultList[0].id }}</td>
                        <td>{{ this.resultList[0].username }}</td>
                        <td>
                            <span @click="edit(this.resultList[0].id)" style="margin-right: 50px;">修改</span>
                            <span @click="deleteData(this.resultList[0].id)">删除</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 分页插件 -->
        <van-pagination v-model="currentPage" :page-count="Math.ceil(total / 10)" mode="simple" :items-per-page="10"
            v-if="showList" />

        <!-- 添加数据弹出框 -->
        <van-dialog v-model:show="showDialog" title="添加数据" show-cancel-button @confirm="addDataset" @cancel="unAddDataset">
            <div class="addDataBox">
                <div class="addDataBox-item">
                    <span>用户名</span>
                    <input type="text" v-model.trim="this.username">
                </div>
                <div class="addDataBox-item">
                    <span>密码：</span>
                    <input type="password" v-model.trim="this.password1">
                </div>
                <div class="addDataBox-item">
                    <span>再次输入密码：</span>
                    <input type="password" v-model.trim="this.password2">
                </div>
            </div>
        </van-dialog>

        <!-- 编辑数据弹出框 -->
        <van-dialog v-model:show="showEditDialog" title="编辑数据" show-cancel-button @confirm="submitEditData">
            <div class="addDataBox">
                <div class="addDataBox-item">
                    <span>用户名：</span>
                    <input type="text" v-model.trim="this.resultList[0].username">
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import request from '../request/request'

export default {
    name: 'dataView',
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
            // true标识展示所有数据，false标识展示查询结果
            showList: true,
            // 查询结果
            resultList: [],
            // 添加用户弹出框
            showDialog: false,
            // 添加的用户数据
            username: '',
            password1: '',
            password2: '',
            // 修改弹出框
            showEditDialog: false,
            // 修改弹出框的数据
            editData: {
                id: '',
                username: ''
            },
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
        // 获取所有未被删除的用户信息，isAdmin=0、deleted=0
        // 获取total
        getAllData () {
            request.get('/api/getUser').then(res => {
                this.allData = res.data
                this.total = this.allData.length
            })
        },
        // 获取10条未被删除的用户信息——降序
        showData () {
            request.get('/api/userInfo/' + (this.currentPage - 1) * 10).then(res => {
                if (res.status === 1) {
                    var msg = res.message
                    alert(msg)
                } else if (res.status === 0) {
                    this.dataList = res.data
                }
            })
        },
        // 根据id删除用户，把isDelete改成1
        deleteData (id) {
            request.post('/api/deleteUser', { id: id }).then(res => {
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
        // 清空搜索框
        search (id) {
            request.get('/api/getUserInfoById/' + id).then(res => {
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
        // 新增用户
        // 失败，清空表单
        // 成功，清空表单、重新加载10条数据、展示所有数据列表
        addDataset () {
            request.post('/api/registerUser', { username: this.username, password1: this.password1, password2: this.password2 }).then(res => {
                if (res.status === 1) {
                    var msg = res.message
                    alert(msg)
                    // 清空表单
                    this.username = ''
                    this.password1 = ''
                    this.password2 = ''
                } else if (res.status === 0) {
                    alert('添加数据成功！')
                    // 清空表单
                    this.username = ''
                    this.password1 = ''
                    this.password2 = ''
                    // 重新加载10条数据
                    this.showData()
                    // 展示所有数据列表
                    this.showList = true
                }
            })
        },
        // 取消添加数据
        unAddDataset () {
            this.username = ''
            this.password1 = ''
            this.password2 = ''
        },
        // 显示编辑弹出框
        edit (id) {
            // 显示编辑弹出框
            this.showEditDialog = true
            // 根据id获取该数据
            this.search(id)
        },
        // 提交编辑弹出框中的数据
        // 数据不得为空
        // 提交username、id
        submitEditData () {
            if (!this.resultList[0].username) {
                alert('数据不能为空')
            } else {
                request.post('/api/updateUsername', { username: this.resultList[0].username, id: this.resultList[0].id }).then(res => {
                    if (res.status === 1) {
                        var msg = res.message
                        alert(msg)
                    } else if (res.status === 0) {
                        alert('修改数据成功')
                        // 重新加载10条数据
                        this.showData()
                        // 重新获取查询结果——在结果列表中修改数据时使用
                        this.search(this.resultList[0].id)
                    }
                })
            }
        }
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

    // 查询用户
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

    // 用户数据展示
    .showData-top {
        width: 100%;
        display: flex;
        align-items: center;

        >span {
            font-size: 18px;
        }

        >div{
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

    // 添加数据弹出框
    .addDataBox {
        width: 100%;
        font-size: 14px;
        margin-bottom: 12px;

        .addDataBox-item {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 30px;
            span{
                width: 100px;
                text-align: center;
            }
        }
    }
}
</style>