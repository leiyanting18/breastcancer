// 导入express中间件
const express = require('express')
// 创建路由模块
const router = express.Router()
const infoUserHandler = require('../router_handler/infoUserHandler')

// 获取所有未被删除的用户数据——isAdmin=0、deleted=0
router.get('/getUser', infoUserHandler.getUser)

// 获取所有未被删除的管理员数据——isAdmin=1、deleted=0
router.get('/getAdmin', infoUserHandler.getAdmin)

// 获取10条未被删除的用户的id、username——num、isAdmin=0、deleted=0
router.get('/userInfo/:num', infoUserHandler.userInfo)

// 获取10条未被删除的管理员的id、username——num、isAdmin=1、deleted=0
router.get('/adminInfo/:num', infoUserHandler.adminInfo)

// 根据id修改用户名——username
router.post('/updateUsername', infoUserHandler.updateUsername)

// 根据id修改密码——oldPassword、P1、P2
router.post('/updatePassword', infoUserHandler.updatePassword)

// 根据id查询未被删除的用户数据——id
router.get('/getUserInfoById/:id', infoUserHandler.getUserInfoById)

// 根据id查询管理员数据——id
router.get('/getAdminInfoById/:id', infoUserHandler.getAdminInfoById)

// 管理员根据id删除用户——deleted=1
router.post('/deleteUser', infoUserHandler.deleteUser)

// 向外共享路由对象
module.exports = router