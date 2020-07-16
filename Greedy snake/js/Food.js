(function(){
    //创建全局变量
    var elements = [];
    //创建食物对象
    function Food(options){
        //如果没有传入对象则让它为空对象
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
    }

    //渲染
    Food.prototype.render = function(map){
        //每次创建新的div之前删除之前的div
        remove();
        //设置随机坐标
        this.x = Tools.getRandom(0,map.offsetWidth/this.width - 1) * this.width;
        this.y = Tools.getRandom(0,map.offsetHeight/this.height - 1) * this.height;
        //动态创建食物
        var div = document.createElement('div');
        elements.push(div);
        //设置食物属性
        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this. y+ 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
        //将食物渲染到地图上
        map.appendChild(div);
    };
    function remove(){
        for(var i = elements.length - 1; i >= 0; i--){
            //删除div元素
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            /* 
            参数一：从哪里开始删除
            参数二：删除几个元素
            */
            elements.splice(i,1);
        }
    }
    window.Food = Food;
})();

