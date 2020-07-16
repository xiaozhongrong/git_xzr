(function(){
    var that;
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function(){
        //将蛇和食物渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);
        //开始游戏的逻辑
        //让蛇移动起来
        runSnake();
        //通过键盘控制蛇的方向
        bindKey();
        //当蛇遇到食物，做相应的处理
        
        

    };
    function runSnake(){
        clearInterval(timerId);
        var timerId = setInterval(function(){
            //让蛇走一步
            that.snake.move(that.food,that.map);
            that.snake.render(that.map);
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            //当蛇遇到边界游戏结束
            if(headX < 0 || headX >= maxX || headY < 0 || headY >= maxY){
                alert('game over');
                clearInterval(timerId);
            }
        },150);
    }
    function bindKey(){
        document.addEventListener('keydown',function(e){
            switch(e.keyCode){
                case 37:that.snake.direction = 'left';break;
                case 38:that.snake.direction = 'top';break;
                case 39:that.snake.direction = 'right';break;
                case 40:that.snake.direction = 'bottom';break;
            }
        },false);
    }
    window.Game = Game;
})();
var map = document.querySelector('#map');
var game = new Game(map);
game.start();
