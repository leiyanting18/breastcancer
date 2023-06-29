// 数据集中数据的新增与删除路由处理函数
const {
    log
} = require('console');
const db = require('../database/index')
var exec = require('child_process').exec;

// 用户获取100条未被删除的数据（为了获取total）——isDelete=0
exports.userGetAllData = function (req, res) {
    const sql5 = 'select * from bcdataset where isDelete=0 LIMIT 100'
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

// 用户获取未被删除的10条数据——num
exports.userGetDataset = function (req, res) {
    // const sql = 'select * from bcdataset  where isDelete=0 and belong in (0,?) order by bcDataId DESC  limit ?,10 '
    const sql = 'SELECT * FROM(select * from bcdataset where isDelete=0 LIMIT 100) bcdataset limit ?,10'
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

// 用户新增数据到audit表——6个证型、TNM、belong、status=1（默认）、createtime=当前时间（默认值）
exports.userAddDataset = function (req, res) {
    // 输入的数据不得为空——6个证型的系数、belong（用于区分用户数据）
    if (req.body.gqyj > 1 || req.body.rdyj > 1 || req.body.crst > 1 || req.body.qxlx > 1 || req.body.pwxr > 1 || req.body.gsyx > 1) {
        return res.send({
            status: 1,
            message: '证型得分不得大于该证型总分！'
        })
    }
    // 将数据提交到audit表
    const sql21 = 'insert into audit set ?'
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
                message: '提交数据到audit失败！'
            })
        }
        res.send({
            status: 0,
            message: '提交数据到audit成功！',
        })
    })
}

// 用户根据bcDataId查询100条系统数据——bcDataId
exports.userGetDataById = function (req, res) {
    var bcDataId = parseInt(req.params.bcDataId);
    if (!bcDataId) {
        return res.send({
            status: 1,
            message: '请输入整数！'
        })
    }
    // sql语句中?的位置要和db.query中参数的位置一样，不能换位
    // const sql3 = "select * from bcdataset where bcDataId=? and bcDataId>0 and bcDataId<101 and isDelete=0 and belong in (0,?)"
    const sql3 = 'SELECT * FROM(select * from bcdataset where isDelete=0  LIMIT 100) bcdataset where bcDataId=?'
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

exports.getRange = function (req, res) {
    const sql18 = 'select * from ' + req.params.table
    db.query(sql18, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length < 0) {
            return res.send({
                status: 1,
                message: '获取范围数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '获取范围数据成功！',
            data: result
        })
    })

}

// 获取apriori数据表中的所有数据
exports.getApriori = function (req, res) {
    const sql14 = 'select * from ' + req.params.table
    db.query(sql14, function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length < 0) {
            return res.send({
                status: 1,
                message: '获取apriori表数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '获取apriori数据成功！',
            data: result
        })
    })
}

// 根据belong获取审核中的数据——status=1
exports.getAuditing = function (req, res) {
    const sql = 'select * from audit where status=1 and belong=? order by id desc '
    db.query(sql, parseInt(req.params.belong), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length < 0) {
            return res.send({
                status: 1,
                message: '获取audit数据失败'
            })
        }
        res.send({
            status: 0,
            message: '获取audit数据成功！',
            data: result
        })
    })
}

// 根据id获取audit中的数据——status=1
exports.getAuditingById = function (req, res) {
    const sql3 = "select * from audit where id=?"
    db.query(sql3, parseInt(req.params.id), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '根据id获取audit中的数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '根据id获取audit中的数据成功！',
            data: result[0]
        })
    })
}

// 根据id更新audit中的数据——6个证型、TNM
exports.updateAuditingById = function (req, res) {
    if (!req.body.gqyj || !req.body.rdyj || !req.body.crst || !req.body.qxlx || !req.body.pwxr || !req.body.gsyx || !req.body.TNM) {
        return res.send({
            status: 1,
            message: '所有数据不得为空！'
        })
    }
    if (req.body.gqyj > 1 || req.body.rdyj > 1 || req.body.crst > 1 || req.body.qxlx > 1 || req.body.pwxr > 1 || req.body.gsyx > 1) {
        return res.send({
            status: 1,
            message: '输入的得分不能大于该证型的最大得分!'
        })
    }
    const sql4 = 'update audit set ? where id=?'
    db.query(sql4, [req.body, parseInt(req.body.id)], function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '修改audit表中的数据失败'
            })
        }
        res.send({
            status: 0,
            message: '修改audit表中的数据失败成功！',
        })
    })
}

// 根据id删除audit表中的数据
exports.deleteAuditingById = function (req, res) {
    const sql1 = `update audit set status=0 where id=?`
    db.query(sql1, parseInt(req.body.id), function (err, result) {
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

// 根据belong获取已审核的数据——status=2和3
exports.getAudited = function (req, res) {
    const sql3 = "select * from audit where belong=? and status in (2,3) order by id desc"
    db.query(sql3, parseInt(req.params.belong), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length <= 0) {
            return res.send({
                status: 1,
                message: '根据belong获取已审核的数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '根据belong获取已审核的数据成功！',
            data: result
        })
    })
}

// 用户预测数据，将预测的结果添加进数据库——6个证型的系数、belong（用于区分用户数据）
// 将数据提交到predicthistory表——deleted=0(默认)、createtime=当前时间（默认值）
exports.userPredictData = function (req, res) {
    const sql21 = 'insert into predicthistory set ?'
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
                message: '提交数据到predicthistory失败！'
            })
        }
        res.send({
            status: 0,
            message: '提交数据到predicthistory成功！',
        })
    })
}

// 根据belong获取未被删除的预测记录的数据——deleted=0
exports.getPredictHistory = function (req, res) {
    const sql = 'select * from predicthistory where deleted=0 and belong=? order by id desc '
    db.query(sql, parseInt(req.params.belong), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length < 0) {
            return res.send({
                status: 1,
                message: '获取predicthistory数据失败'
            })
        }
        res.send({
            status: 0,
            message: '获取predicthistory数据成功！',
            data: result
        })
    })
}

// 根据数据id获取predicthistory中未被删除的数据——deleted=0
exports.getPredictHistoryById = function (req, res) {
    const sql3 = "select * from predicthistory where deleted=0 and id=?"
    db.query(sql3, parseInt(req.params.id), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.length !== 1) {
            return res.send({
                status: 1,
                message: '根据id获取predicthistory中的数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '根据id获取predicthistory中的数据成功！',
            data: result[0]
        })
    })
}

// 根据id删除predicthistory表中的数据——deleted=1
exports.deletePredictHistoryById = function (req, res) {
    const sql1 = `update predicthistory set deleted=1 where id=?`
    db.query(sql1, parseInt(req.body.id), function (err, result) {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (result.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '删除predicthistory数据失败！'
            })
        }
        res.send({
            status: 0,
            message: '删除predicthistory数据成功！',
        })
    })

}