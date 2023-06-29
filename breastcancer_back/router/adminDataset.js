// 数据集操作模块

const express = require('express')
const router = express.Router()
const adminDatasetHandler = require('../router_handler/adminDatasetHandler')

// 管理员获取全部未被删除的数据（为了获取total）——isDelete=0
router.get('/adminGetAllData', adminDatasetHandler.adminGetAllData)

// 管理员获取未被删除的10条数据——num
router.get('/adminGetDataset/:num', adminDatasetHandler.adminGetDataset)

// 管理员新增数据——6个证型、TNM
router.post('/adminAddDataset', adminDatasetHandler.adminAddDataset)

// 管理员根据bcDataId查询未被删除的数据——isDelete=0
router.get('/adminGetDataById/:bcDataId', adminDatasetHandler.adminGetDataById)

// 管理员根据bcDataId更新数据——6种证型、TNM
router.post('/adminUpdateDataset', adminDatasetHandler.adminUpdateDataset)

// 管理员根据bcDataId删除数据——isDelete=1
router.post('/adminDeleteData', adminDatasetHandler.adminDeleteData)

// 管理员获取audit中所有未审核的数据——status=1
router.get('/getAllAudited', adminDatasetHandler.getAllAudited)

// 管理员通过审核id对应的数据——status=3
router.post('/auditSuccess', adminDatasetHandler.auditSuccess)

// 审核通过，把数据添加到bcdataset——6个证型的系数、TNM、belong（用于区分用户数据）
router.post('/auditSuccessToBcdataset', adminDatasetHandler.auditSuccessToBcdataset)

// 管理员审核不通过id对应的数据——status=2
router.post('/auditFail', adminDatasetHandler.auditFail)

// kmeans
router.post('/kmeans', adminDatasetHandler.kmeans)

// distant
router.post('/distant', adminDatasetHandler.distant)

// frequency
router.post('/frequency', adminDatasetHandler.frequency)


module.exports = router