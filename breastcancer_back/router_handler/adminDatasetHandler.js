// 数据集中数据的新增与删除路由处理函数

const db = require('../database/index')
const spawn = require('child_process').spawn
// var exec = require('child_process').exec;

// 管理员获取全部未被删除的数据（为了获取total）——isDelete=0
exports.adminGetAllData = function (req, res) {
    const sql5 = 'select * from bcdataset where isDelete=0'
    db.query(sql5, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length === 0) {
            return res.send({
                status: 1,
                message: '无数据！'
            })
        }
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: result,
        })
    })
}

// 管理员获取未被删除的10条数据——num
exports.adminGetDataset = function (req, res) {
    const sql = 'select * from bcdataset  where isDelete=0 order by bcDataId DESC  limit ?,10 '
    // const sql = 'select * from bcdataset  where isDelete=0 limit ?,10 '
    db.query(sql, parseInt(req.params.num), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length === 0) {
            return res.send({
                status: 1,
                message: '无数据！'
            })
        }
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: result,
        })
    })
}

// 管理员新增数据——6个证型、TNM
exports.adminAddDataset = function (req, res) {
    // 6个证型、TNM不得为空
    if (!req.body.gqyj || !req.body.rdyj || !req.body.crst || !req.body.qxlx || !req.body.pwxr || !req.body.gsyx || !req.body.TNM) {
        return res.send({
            status: 1,
            message: '所有数据不得为空！'
        })
    }
    // 系数不能大于1(得分不能大于该证型的最大得分)
    if (req.body.gqyj > 1 || req.body.rdyj > 1 || req.body.crst > 1 || req.body.qxlx > 1 || req.body.pwxr > 1 || req.body.gsyx > 1) {
        return res.send({
            status: 1,
            message: '输入的得分不能大于该证型的最大得分!'
        })
    }
    // 新增数据
    const sql2 = 'insert into bcdataset set ?'
    db.query(sql2, req.body, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '新增数据失败！'
            })
        }
        // 新增数据成功
        res.send({
            status: 0,
            message: '新增数据成功！',
            data: result[0]
        })
    })
}

// 管理员根据bcDataId查询未被删除的数据——isDelete=0
exports.adminGetDataById = function (req, res) {
    // 只能输入整数
    var bcDataId = parseInt(req.params.bcDataId);
    if (!bcDataId) {
        return res.send({
            status: 1,
            message: '查询内容不符合规定，请输入数据的id！'
        })
    }
    const sql3 = "select * from bcdataset where bcDataId=? and isDelete=0"
    db.query(sql3, parseInt(req.params.bcDataId), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '不存在该数据！'
            })
        }
        res.send({
            status: 0,
            message: '查询数据成功！',
            data: result[0]
        })
    })
}

// 管理员根据bcDataId更新数据——6种证型、TNM
exports.adminUpdateDataset = function (req, res) {
    // 输入的数据不能为空
    if (!req.body.gqyj || !req.body.rdyj || !req.body.crst || !req.body.qxlx || !req.body.pwxr || !req.body.gsyx || !req.body.TNM) {
        return res.send({
            status: 1,
            message: '所有数据不得为空！'
        })
    }
    // 输入的得分不能大于该证型的最大得分
    if (req.body.gqyj > 1 || req.body.rdyj > 1 || req.body.crst > 1 || req.body.qxlx > 1 || req.body.pwxr > 1 || req.body.gsyx > 1) {
        return res.send({
            status: 1,
            message: '输入的得分不能大于该证型的最大得分!'
        })
    }
    const sql4 = 'update bcdataset set ? where bcDataId=?'
    db.query(sql4, [req.body, parseInt(req.body.bcDataId)], function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '更新数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '更新数据成功！',
        })
    })
}


// 管理员根据bcDataId删除数据——isDelete=1
exports.adminDeleteData = function (req, res) {
    const sql1 = `update bcdataset set isDelete=1 where bcDataId=?`
    db.query(sql1, parseInt(req.body.bcDataId), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '删除数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '删除数据成功！',
        })
    })

}


// 管理员获取audit中所有未审核的数据——status=1
exports.getAllAudited = function (req, res) {
    const sql = 'select * from audit where status=1 order by id desc'
    db.query(sql, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        res.send({
            status: 0,
            message: '获取status=1的所有数据成功！',
            data: result
        })
    })
}

// 管理员通过审核id对应的数据——status=3
exports.auditSuccess = function (req, res) {
    // 根据id将status设置为3
    const sql1 = 'update audit set status=3 where id=?'
    db.query(sql1, parseInt(req.body.id), function (err, result1) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result1.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '审核通过失败！'
            })
        }
        // 根据id获取audit中对应的数据，返回到前端，前端再将返回的数据插入到bcdataset数据表中
        const sql2 = 'select * from audit where id=?'
        db.query(sql2, parseInt(req.body.id), function (err, result2) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (result2.length <= 0) {
                return res.send({
                    status: 1,
                    message: '根据id获取audit中对应的数据失败！',
                    data: result2
                })
            }
            res.send({
                status: 0,
                message: '根据id获取audit中对应的数据成功！',
                data: result2[0]
            })
        })
    })
}
// 审核通过，把数据添加到bcdataset——6个证型的系数、TNM、belong（用于区分用户数据）
exports.auditSuccessToBcdataset = function (req, res) {
    const sql21 = 'insert into bcdataset set ?'
    db.query(sql21, req.body, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '审核通过，添加数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '审核通过，添加数据成功！',
        })
    })
}


// 管理员审核不通过id对应的数据——status=2
exports.auditFail = function (req, res) {
    const sql = 'update audit set status=2 where id=?'
    db.query(sql, parseInt(req.body.id), function (err, result1) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result1.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '审核不通过失败！'
            })
        }
        res.send({
            status: 0,
            message: '审核不通过成功！',
        })
    })
}

// kmeans
exports.kmeans = function (req, res) {
    const sql22 = 'truncate table kmeansrange'
    db.query(sql22, function (err, result1) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        const sql23 = 'truncate table kmeansapriori'
        db.query(sql23, function (err, result2) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            const pyFile = 'kmeans.py';
            const args = [req.body.support, req.body.confidence];
            args.unshift(pyFile);
            const pyspawn = spawn('python', args);
            pyspawn.stdout.on('data', (data) => {
                console.log(data.toString());
                res.send({
                    status: 0,
                    message: 'kmeans成功！',
                })
            });
        })
    })
}

// distant
exports.distant = function (req, res) {
    const sql24 = 'truncate table distantrange'
    db.query(sql24, function (err, result1) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        const sql23 = 'truncate table distantapriori'
        db.query(sql23, function (err, result2) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            // python文件名
            const pyFile = 'distant.py';
            // 后端需要传递给python文件的参数
            const args = [req.body.support, req.body.confidence];
            // 在数组的首位添加python文件名
            args.unshift(pyFile);
            // 创建一个子进程
            const pyspawn = spawn('python', args);
            // 标准输出流，把python中print出的内容返回给后端
            pyspawn.stdout.on('data', (data) => {
                console.log(data.toString());
                res.send({
                    status: 0,
                    message: 'distant成功！',
                })
            });
        })
    })
}

// frequency
exports.frequency = function (req, res) {
    const sql24 = 'truncate table frequencyrange'
    db.query(sql24, function (err, result1) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        const sql23 = 'truncate table frequencyapriori'
        db.query(sql23, function (err, result2) {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            const pyFile = 'frequency.py';
            const args = [req.body.support, req.body.confidence];
            args.unshift(pyFile);
            const pyspawn = spawn('python', args);
            pyspawn.stdout.on('data', (data) => {
                console.log(data.toString());
                res.send({
                    status: 0,
                    message: 'frequency成功！',
                })
            });

        })
    })
}