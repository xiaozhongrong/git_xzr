<?php
    header("Content-type:text/html;charset=utf-8");
    //设置统一返回格式
    $responseData = array("code"=>'0',"message"=>'');
    //获取数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $id = $_POST["id"];

    //判断数据是否存在
    if(!$username || !$password || !$id){
        $responseData["code"] = 111;
        $responseData["message"] = '数据获取失败';
        echo json_encode($responseData);
        exit;
    }
    //连接数据库
    $link = mysql_connect("localhost","root","123456");
    //数据库连接失败？
    if(!$link){
        echo '数据库连接失败';
        exit;
    }
    //设置字符集
    mysql_set_charset("utf8");
    //选择数据库
    mysql_select_db("test");
    //准备SQL语句
    $sql = "SELECT * FROM user WHERE username='{$username}' AND id!={$id}";
    //发送SQL语句
    $res = mysql_query($sql);
    //取出数据
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["code"] = 101;
        $responseData["message"] = '用户名存在';
        echo json_encode($responseData);
        exit;//终止后续所有代码
    }
    //加密密码
    $str = md5(md5($password));
    $sql2 = "UPDATE user SET username='{$username}',password='{$str}' WHERE id={$id}";

    $res2 = mysql_query($sql2);
    if($res2){
        $responseData["message"] = '修改成功';
        echo json_encode($responseData);    
    }else{
        $responseData["code"] = 11;
        $responseData["message"] = '修改失败，请重试';
        echo json_encode($responseData); 
    }

    mysql_close($link);

?>