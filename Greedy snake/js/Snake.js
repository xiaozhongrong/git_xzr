//创建子自调用函数 开启一个新的局部作用域，防止命名冲突
(function(){
    var position = "absolute";
    var elements = [];
    function Snake(options){
        options = options || {};
        //蛇节大小
        this.width = options.width || 20;
        this.height = options.height || 20;
        //方向
        this.direction = options.direction || 'right';
        //蛇的身体 第一个元素是蛇头
        this.body = [
            {x:3,y:2,color:'red'},
            {x:2,y:2,color:'blue'},
            {x:1,y:2,color:'blue'}
        ];
    }
    Snake.prototype.render = function(map){
        remove();
        for(var i = 0,len = this.body.length;i < len; i++){
            var obj = this.body[i];
            var div = document.createElement('div');
            elements.push(div);
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = obj.x * this.width + 'px';
            div.style.top = obj.y * this.height + 'px';
            div.style.backgroundColor = obj.color;
            map.appendChild(div);
        }
    };
    Snake.prototype.move = function(food,map){
        //控制蛇的身体移动 （当前蛇节到上一个蛇节的位置）
        for(var i = this.body.length - 1;i > 0; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //蛇头的移动
        //判断蛇头移动的方向
        var head = this.body[0];
        switch(this.direction){
            case 'right': head.x += 1;break;
            case 'left': head.x -= 1;break;
            case 'top':head.y -= 1;break;
            case 'bottom':head.y += 1;break;
        }
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if(headX === food.x && headY === food.y){
            //让蛇增加一节
            var last = this.body[this.body.length - 1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //重新生成食物
            food.render(map);
        }
    };
    function remove(){
        for(var i = elements.length - 1;i >= 0;i--){
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i,1);
        }
    }
    window.Snake = Snake;
})();
