/**
* 路由模块
*/
var express = require('express');
var router = express.Router();
var service = require('./service.js');

//路由处理

//渲染主页
router.get('/',service.showIndex);
//添加图书（跳转到添加图书的页面）
router.get('/toAddBook',service.toAddBook);
//添加图书（提交表单）
router.post('/addBook',service.addBook);
//修改图书信息（跳转到修改图书信息的页面）
router.get('/toEditBook',service.toEditBook);
//修改图书（提交表单）
router.post('/editBook',service.editBook);
//删除图书
router.get('/toRemoveBook',service.toRemoveBook);



module.exports = router;