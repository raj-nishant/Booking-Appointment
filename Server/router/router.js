const express=require('express');
const router=express.Router();
const controller=require('../controllers/controllers');
//create
router.post('/postData',controller.postDataController)
//Read
router.get('/getData',controller.getDataController)
//delete
router.delete('/deleteData/:Id',controller.deleteDataController)
//update get
router.get('/getUpdateData/:Id',controller.getUpdateDataController)
//update post
router.put('/postUpdateData/:Id',controller.postUpdateDataController)
module.exports=router
