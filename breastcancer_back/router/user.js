// 用户路由模块

// 导入express中间件
const express = require('express')
// 创建路由模块
const router = express.Router()
// 导入用户路由函数处理模块
const userHandler = require('../router_handler/userHandler')

// 注册——username、password1、password2
router.post('/registerUser', userHandler.registerUser)

// 登录——username、password
router.post('/loginUser', userHandler.loginUser)

// 共享router对象
module.exports = router