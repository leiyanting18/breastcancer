// 导入数据库模块
const db = require('../database/index')
const {
    query
} = require('express')

// 注册——username、password1、password2
exports.registerUser = function (req, res) {
    // 用户名和密码不得为空
    const registerInfo = req.body
    if (!registerInfo.username || !registerInfo.password1 || !registerInfo.password2) {
        return res.send({
            status: 1,
            message: '用户名和密码不能为空！'
        })
    }
    // 用户名和密码的校验
    var usernameReg = /^[a-zA-Z0-9]{1,10}$/
    var passwordReg = /^[a-zA-Z0-9]{6,16}$/
    if (!usernameReg.test(registerInfo.username) || !passwordReg.test(registerInfo.password1)) {
        return res.send({
            status: 1,
            message: '用户名或密码不符合命名规则！'
        })
    }
    // 在未被删除的用户中查询用户名是否已存在
    const sql = 'select * from user where username=? and deleted=0'
    db.query(sql, registerInfo.username, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length > 0) {
            return res.send({
                status: 1,
                message: '用户名已被占用，请更换用户名！'
            })
        }
        // 两次输入的密码要一致
        if (registerInfo.password1 !== registerInfo.password2) {
            return res.send({
                status: 1,
                message: '两次输入的密码不一致！',
            })
        }
        // 插入数据
        const sql2 = 'insert into user set ?'
        db.query(sql2, {
            username: registerInfo.username,
            password: registerInfo.password1
        }, function (err, result) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (result.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册失败！'
                })
            }
            // 注册成功
            res.send({
                status: 0,
                message: '注册成功！',
            })
        })
    })
}

// 登录——username、password
exports.loginUser = function (req, res) {
    // 用户名和密码不得为空
    const loginInfo = req.body
    if (!loginInfo.username || !loginInfo.password) {
        return res.send({
            status: 1,
            message: '用户名和密码不能为空！'
        })
    }
    // 在未被删除的用户中查询是否存在该用户名
    sql3 = 'select * from user where username=? and deleted=0'
    db.query(sql3, loginInfo.username, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '登录失败，用户名无效！'
            })
        }
        // 判断密码是否正确
        if (loginInfo.password !== result[0].password) {
            return res.send({
                status: 1,
                message: '密码错误，请重新输入！'
            })
        }
        // 登录成功
        res.send({
            status: 0,
            message: '登录成功！',
            data: result[0]
        })
    })

}