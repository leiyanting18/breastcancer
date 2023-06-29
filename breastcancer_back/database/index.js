// 创建数据库的连接对象

// 导入mysql模块
const mysql = require('mysql')

// 创建数据库的连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'breastcancer',
    // 解决时间格式错误的问题——数据库服务器的时区与本地不同，需要手动设定时区
    timezone: "08:00",
})

// 共享数据库对象db
module.exports = db