<?php
    header("Content-type:text/html;charset=utf-8");
    //设置统一的返回格式
    $responseData = array("code"=>0,"message"=>'');
    //获取id
    $id = $_GET['id'];
    //判断id是否存在
    if(!$id){
        $responseData["code"] = 202;
        $responseData["message"] = "要修改的id不存在";
        echo json_encode($responseData);
        exit;
    }
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
    $sql = "SELECT * FROM user WHERE id={$id}";
    //发送SQL语句
    $res = mysql_query($sql);
    //取出数据
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["message"] = json_encode($row);
        echo json_encode($responseData);
    }else{
        $responseData["code"] = 104;
        $responseData["message"]= "修改的数据不存在";
        echo json_encode($responseData);
    }

   //关闭数据库
   mysql_close($link);

?>