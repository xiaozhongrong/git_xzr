/** 
 * 业务模块
 */
var fs = require('fs');
var path = require('path');
var data = require('./data.json');

//自动生成图书编号
var maxBookCode = function () {
    var arr = [];
    data.forEach(function (item) {
        arr.push(item.id);
    });
    return Math.max.apply(null, arr);
};

//渲染主页面
exports.showIndex = function (req, res) {
    res.render('index.html', {
        list: data
    });
};
//跳转到添加图书的页面
exports.toAddBook = function (req, res) {
    res.render('addBook.html', {});
};
//添加图书保存数据
exports.addBook = function (req, res) {
    //获取表单数据
    var info = req.body;
    var book = {};
    for (var key in info) {
        book[key] = info[key];
    }
    book.id = maxBookCode() + 1;
    data.push(book);
    //把内存中的数据写入文件中
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), function (err) {
        if (err) {
            res.send('SERVER ERRPR!');
        }
        //文件写入成功之后重新跳转到主页面
        res.redirect('/');
    });
};

//修改图书信息
exports.toEditBook = function (req, res) {
    var id = req.query.id;
    var book = {};
    data.forEach(function (item) {
        if (id === item.id) {
            book = item;
            return;
        }
    });
    res.render('editBook.html', book);
};
exports.editBook = function (req, res) {
    var info = req.body;
    data.forEach(function (item) {
        if (info.id == item.id) {
            for (var key in info) {
                item[key] = info[key];
            }
            return;
        }
    });
    //把内存中的数据写入文件中
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), function (err) {
        if (err) {
            res.send('SERVER ERRPR!');
        }
        //文件写入成功之后重新跳转到主页面
        res.redirect('/');
    });
};
exports.toRemoveBook = function (req, res) {
    var id = req.query.id;
    data.forEach(function(item){
        if(item.id == id){
            //测试代码
            // console.log(item.id);
            data.splice(id-1, 1);
            return;
        }
    });
    //测试代码
    // console.log(id,id-1);
    //把内存中的数据写入文件中
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), function (err) {
        if (err) {
            res.send('SERVER ERRPR!');
        }
        //文件写入成功之后重新跳转到主页面
        res.redirect('/');
    });
};