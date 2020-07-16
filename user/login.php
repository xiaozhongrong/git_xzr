<?php
    header('Content-type:text/html;charset=utf-8');
    //设置统一返回格式
    $responseData = array("code" => 0, "message" => "");

    //取出数据
    $username = $_POST['username'];
    $password = $_POST['password'];
    //验证用户名和密码是否存在f
    if(!$username || !$password){
        $responseData["code"] = 101;
        $responseData["message"] = "用户名或密码不能为空";
        echo json_encode($responseData);
        exit;
    };
    //连接数据库
    $link = mysql_connect("localhost","root","123456");
    //判断是否连接成功
    if(!$link){
        echo "连接失败";
        exit;
    }

    //设置字符集
    mysql_set_charset("utf8");

    //选择数据库
    mysql_select_db("test");

    //登录
    //md5加密密码
    $str = md5(md5($password)."xzr");
    $sql = "SELECT * FROM user WHERE username='{$username}' AND password='{$str}'";

    //发送数据
    $res = mysql_query($sql);
    //取出第一行数据
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $responseData["code"] = 101;
        $responseData["message"] = "用户名或密码错误";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = "登录成功";
        echo json_encode($responseData); 
    }
    mysql_close($link);
?>