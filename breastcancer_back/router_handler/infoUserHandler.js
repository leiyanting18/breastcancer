// 导入数据库模块
const db = require('../database/index')
// 密码加密
// const bcrypt = require('bcryptjs')

// 获取所有未被删除的用户数据——isAdmin=0、deleted=0
// 为了获取total
exports.getUser = function (req, res) {
    const sql12 = 'select * from user where isAdmin=0 and deleted=0'
    db.query(sql12, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length === 0) {
            return res.send({
                status: 1,
                message: '无用户数据！'
            })
        }
        res.send({
            status: 0,
            message: '获取用户数据成功！',
            data: result
        })
    })
}

// 获取所有未被删除的管理员数据——isAdmin=1、deleted=0
exports.getAdmin = function (req, res) {
    const sql13 = 'select * from user where isAdmin=1 and deleted=0'
    db.query(sql13, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length === 0) {
            return res.send({
                status: 1,
                message: '无管理员数据！'
            })
        }
        res.send({
            status: 0,
            message: '获取管理员数据成功！',
            data: result
        })
    })
}

// 获取10条未被删除的用户的id、username——num、isAdmin=0、deleted=0
exports.userInfo = function (req, res) {
    const sql1 = 'select id, username from user  where isAdmin=0 and deleted=0 order by id DESC limit ?,10'
    db.query(sql1, parseInt(req.params.num), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length === 0) {
            return res.send({
                status: 1,
                message: '无用户数据！'
            })
        }
        res.send({
            status: 0,
            message: '用户数据获取成功！',
            data: result
        })
    })

}

// 获取10条未被删除的管理员的id、username——num、isAdmin=1、deleted=0
exports.adminInfo = function (req, res) {
    const sql2 = 'select id, username from user where isAdmin=1 and deleted=0 order by id DESC limit ?,10'
    db.query(sql2, parseInt(req.params.num), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length === 0) {
            return res.send({
                status: 1,
                message: '无管理员数据！'
            })
        }
        res.send({
            status: 0,
            message: '获取管理员数据成功！',
            data: result
        })
    })

}

// 根据id修改用户名——username
exports.updateUsername = function (req, res) {
    // 新用户名不得为空
    if (!req.body.username) {
        return res.send({
            status: 1,
            message: '新用户名不得为空！'
        })
    }
    // 新用户名的校验
    var usernameReg = /^[a-zA-Z0-9]{1,10}$/
    if (!usernameReg.test(req.body.username)) {
        return res.send({
            status: 1,
            message: '新用户名不符合命名规则！'
        })
    }
    // 在未被删除的用户中查询新用户名是否已存在，不用和旧用户名对比（多此一举）
    const sql2 = 'select * from user where username=? and deleted=0'
    db.query(sql2, req.body.username, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 0) {
            return res.send({
                status: 1,
                message: '新用户名已被占用，请更换其他用户名！'
            })
        }
        // 根据id，更新新用户名
        const sql3 = 'update user set username=? where id=?'
        db.query(sql3, [req.body.username, req.body.id], function (err, result) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (result.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '修改用户名失败！'
                })
            }
            // 更新用户名成功
            res.send({
                status: 0,
                message: '修改用户名成功！'
            })
        })
    })

}

// 根据id修改密码——oldPassword、P1、P2
exports.updatePassword = function (req, res) {
    // 旧密码、两个新密码不得为空
    if (!req.body.oldPassword || !req.body.P1 || !req.body.P2) {
        return res.send({
            status: 1,
            message: '新旧密码不得为空！'
        })
    }
    // 根据id获取旧密码，判断旧密码是否正确
    const sql7 = 'select * from user where id=?'
    db.query(sql7, req.body.id, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '用户不存在！'
            })
        }
        if (req.body.oldPassword !== result[0].password) {
            return res.send({
                status: 1,
                message: '旧密码错误，请重新输入！'
            })
        }
        // 新密码的校验
        var passwordReg = /^[a-zA-Z0-9]{6,16}$/
        if (!passwordReg.test(req.body.P1)) {
            return res.send({
                status: 1,
                message: '新密码不符合命名规则！'
            })
        }
        // 新密码和旧密码不得一致
        if (req.body.P1 === result[0].password) {
            return res.send({
                status: 1,
                message: '新旧密码不得一致！'
            })
        }
        // 判断两个新密码是否一致
        if (req.body.P1 !== req.body.P2) {
            return res.send({
                status: 1,
                message: '两次输入的新密码不一致，请重新输入！'
            })
        }
        // 根据id修改密码
        const sql8 = 'update user set password=? where id=?'
        db.query(sql8, [req.body.P1, req.body.id], function (err, result) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (result.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '修改密码失败！'
                })
            }
            // 修改密码成功
            res.send({
                status: 0,
                message: '修改密码成功！'
            })
        })
    })
}

// 根据id查询未被删除的用户数据——isAdmin=0、deleted=0
exports.getUserInfoById = function (req, res) {
    // 只能输入数字
    var id = parseInt(req.params.id);
    if (!id) {
        return res.send({
            status: 1,
            message: '查询内容不符合规定，请输入数据的id！'
        })
    }
    const sql10 = 'select * from user where id=? and deleted=0 and isAdmin=0'
    db.query(sql10, parseInt(req.params.id), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '不存在该用户！'
            })
        }
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: result
        })
    })
}

// 根据id查询管理员数据——isAdmin=1、deleted=0
exports.getAdminInfoById = function (req, res) {
    // 只能输入整数
    var id = parseInt(req.params.id);
    if (!id) {
        return res.send({
            status: 1,
            message: '查询内容不符合规定，请输入数据的id！'
        })
    }
    const sql14 = 'select * from user where id=? and deleted=0 and isAdmin=1'
    db.query(sql14, parseInt(req.params.id), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '不存在该管理员！'
            })
        }
        res.send({
            status: 0,
            message: '获取管理员数据成功！',
            data: result
        })
    })
}


// 管理员根据id删除用户——deleted=1
exports.deleteUser = function (req, res) {
    const sql6 = `update user set deleted=1 where id=?`
    db.query(sql6, parseInt(req.body.id), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '删除用户失败！'
            })
        }
        res.send({
            status: 0,
            message: '删除用户成功！',
        })
    })

}