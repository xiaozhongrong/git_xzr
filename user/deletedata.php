<?php
    header("Content-type:text/html;charset=utf-8");
    //设置统一的返回格式
    $responceData = array("code"=>0,"message"=>'');
    //获取id
    $id = $_GET['id'];
    //连接数据库
    $link = mysql_connect("localhost","root","123456");
    //判断是否连接成功
    if(!$link){
        echo '数据库连接失败';
        exit;
    };
    //设置字符集
    mysql_set_charset("utf8");
    //选择数据库
    mysql_select_db("test");

    //准备SQL语句
    $sql = "DELETE FROM user WHERE id={$id}";
    //发送SQL语句
    $res = mysql_query($sql);
    if($res){
        $responceData["message"] = "删除成功";
        echo json_encode($responceData);
    }else{
        $responceData["code"] = 101;
        $responceData["message"] = "删除失败";
        //返回前台页面
        echo json_encode($responceData);
    }
?>