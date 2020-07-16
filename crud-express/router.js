var fs = require('fs');
var express = require('express');
var router = express.Router();
var Student = require('./student');



router.get('/students',function (req,res) {
    Student.find(function (err,students) {
        if(err){
            return res.status(500).send('Server is Error');
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '橘子',
                '草莓'
            ],
            students:students
        });
    });
});



router.get('/students/new',function (req,res) {
    res.render('new.html');
});



//添加
router.post('/students/new',function (req,res) {
    Student.save(req.body,function (err) {
        if(err){
            return res.status(500).send('Server is Error');
        }
        res.redirect('/students');
    });
});



router.get('/students/edit',function (req,res) {
    Student.findById(parseInt(req.query.id),function (err,student) {
        if(err){
            return res.status(500).send('Server is Error');
        }
        res.render('edit.html',{
            student:student
        });
    });
});


router.post('/students/edit',function (req,res) {
    Student.updataById(req.body,function (err) {
        if(err){
            return res.status(500).send('Server is Error');
        }
        res.redirect('/students');
    });
});



router.get('/students/delete',function (req,res) {
    Student.deleteById(req.query.id,function (err) {
        if(err){
            return res.status(500).send('Server is Error');
        }
        res.redirect('/students');
    });
});


module.exports = router;