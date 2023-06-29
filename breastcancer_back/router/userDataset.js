// 数据集操作模块

const express = require('express')
const router = express.Router()
const userDatasetHandler = require('../router_handler/userDatasetHandler')

// 用户获取100条未被删除的数据（为了获取total）——isDelete=0
router.get('/userGetAllData', userDatasetHandler.userGetAllData)

// 用户获取未被删除的10条数据——num
router.get('/userGetDataset/:num', userDatasetHandler.userGetDataset)


// 用户新增数据到audit表——6个证型、TNM、belong、status=1（默认）、createtime=当前时间（默认值）
router.post('/userAddDataset', userDatasetHandler.userAddDataset)

// 用户根据bcDataId查询100条系统数据——bcDataId
router.get('/userGetDataById/:bcDataId', userDatasetHandler.userGetDataById)

// 算法的范围
router.get('/getRange/:table', userDatasetHandler.getRange)

// apriori运算结果
router.get('/getApriori/:table', userDatasetHandler.getApriori)

// 根据belong获取审核中的数据——status=1
router.get('/getAuditing/:belong', userDatasetHandler.getAuditing)

// 根据id获取audit中的数据——status=1
router.get('/getAuditingById/:id', userDatasetHandler.getAuditingById)

// 根据id更新audit中的数据
router.post('/updateAuditingById', userDatasetHandler.updateAuditingById)

// 根据id删除audit表中的数据
router.post('/deleteAuditingById', userDatasetHandler.deleteAuditingById)

// 根据belong获取已审核的数据——status=2和3
router.get('/getAudited/:belong', userDatasetHandler.getAudited)


// 用户预测数据，将预测的结果添加进数据库——6个证型的系数、belong（用于区分用户数据）
// 将数据提交到predicthistory表——createtime=当前时间（默认值）
router.post('/userPredictData', userDatasetHandler.userPredictData)

// 根据belong获取预测记录的数据
router.get('/getPredictHistory/:belong', userDatasetHandler.getPredictHistory)

// 根据数据id获取predicthistory中的数据
router.get('/getPredictHistoryById/:id', userDatasetHandler.getPredictHistoryById)

// 根据id删除predicthistory表中的数据
router.post('/deletePredictHistoryById', userDatasetHandler.deletePredictHistoryById)

module.exports = router