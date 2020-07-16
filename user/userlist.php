<?php
    header('Content-type:text/html;charset=utf-8');
    //设置统一返回格式
    $responseData = array("code" => 0, "message" => "");

    //连接数据库
    $link = mysql_connect("localhost","root","123456");
    //判断是否连接成功
    if(!$link){
        echo '连接数据库失败',
        exit;
    }
    //设置字符集
    mysql_set_charset("utf8");
    //选择数据库
    mysql_select_db("test");

    //准备SQL语句
    $sql = "SELECT * FROM user";
    //发送SQL语句
    $res = mysql_query($sql);
    $arr = array();
    while($row = mysql_fetch_assoc($res)){
        array_push($arr,$row);
    }
    echo json_encode($arr);

    //关闭数据库
    mysql_close($link);
?>