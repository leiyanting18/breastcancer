// 用于创建web服务器或API接口服务器（作用和node.js内置的http模块一样，只是express的方法更加简单）
const express = require('express')
    // 导入cors中间件，用于跨域
const cors = require('cors')
    // 登录和注册模块
const userRouter = require('./router/user')
    // 导入config模块，加密和解密token
const config = require('./config')
    // 解析token的中间件
const expressJWT = require('express-jwt')
    // 获取用户信息路由模块
const userInfoRouter = require('./router/userInfo')
    // 用户数据处理模块
const userDataset = require('./router/userDataset')
    // 管理员数据处理模块
const adminDataset = require('./router/adminDataset')



// 创建web服务器实例
const app = express()
    // 把cors注册为全局中间件
app.use(cors())
    // 配置express的内置中间件express.urlencoded()，用于解析表单数据
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) {
        return res.send({
            status: 1,
            message: err instanceof Error ? err.message : err,
        })
    }
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            message: '身份认证失败！'
        })
    }
    // 未知的错误
    res.send({
        status: 1,
        message: err instanceof Error ? err.message : err,
    })
})

// token认证，认证成功则自动挂载解析出来的信息
// .unless()——指定哪些接口不需要进行Token的身份认证
// 这里指定/api接口不需要进行token认证
app.use(expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ['HS256']
}).unless({
    path: [/^\/api\//]
}))


// 把用户路由模块注册为全局中间件
// 挂载/api为路径前缀
app.use('/api', userRouter)
app.use('/api', userInfoRouter)
app.use('/api', userDataset)
app.use('/api', adminDataset)

// 启动服务器
app.listen(3007, function() {
    console.log('http://127.0.0.1:3007')
})