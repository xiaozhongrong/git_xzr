<?php
    header('Content-type:text/html;charset=utf-8');
    //设置统一返回格式
    $responseData = array("code" => 0, "message" => "");

    //取出数据
    $username = $_POST['username'];
    $password = $_POST['password'];
    $addtime = $_POST['addtime'];

    //验证用户名和密码是否存在f
    if(!$username || !$password){
        $responseData["code"] = 101;
        $responseData["message"] = "用户名或密码不能为空";
        echo json_encode($responseData);
        exit;
    }

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
    //准备SQL语句 验证用户名是否重名
    $sql = "SELECT * FROM user WHERE username='{$username}'";
    //发送SQL语句
    $res = mysql_query($sql);

    //取出一行数据
    $row = mysql_fetch_assoc($res);
    if($row){
       $responseData["code"]=102;
       $responseData["message"]="用户名已被注册!" ;
       echo json_encode($responseData);
       exit;
    }

    //md5加密密码
    $str = md5(md5($password)."xzr");
    //准备SQL语句 将数据插入发到数据库中
    $sql2 = "INSERT INTO user(username,password,creattime) VALUES('{$username}','{$str}',{$addtime})";

    //返回布尔值
    $res = mysql_query($sql2);
    if($res){
        $responseData["message"]="注册成功!" ;
        echo json_encode($responseData);
    }else{
        $responseData["code"]=103;
        $responseData["message"]="注册失败!" ;
        echo json_encode($responseData);
    };
    mysql_close($link);
?>