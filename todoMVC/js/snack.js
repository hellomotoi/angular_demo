// 小另类模块
// 贪吃蛇游戏

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

// 贪吃蛇出现的起始坐标
var x = y = 80;

var ax = 0; //食物坐标
var ay = 0; //食物坐标

var t = 20; //蛇身长

var map = []; //记录蛇运行路径

var size = 8; //蛇身单元大小

// 起始方向
var direction = 2; // 1 向上 2 向右 0 左 3下

function set_game_speed(){ // 移动蛇
	switch(direction){
		case 1:y = y-size;
		break;
		case 2:x = x+size;
		break;
		case 0:x = x-size;
		break;
		case 3:y = y+size;
		break;
	}
	if(x>820 || y>260 || x<0 || y<0){
		alert("你挂了，继续努力吧!.....");
		window.location.reload();
	}
	for(var i=0;i<map.length;i++){
		if( parseInt(map[i].x)==x && parseInt(map[i].y)==y){
			alert("你挂了，继续努力吧!.....");
			window.location.reload();
		}
	}
	if (map.length>t) { //保持蛇身长度
		var cl = map.shift(); //删除数组第一项，并且返回原元素
		cxt.clearRect(cl['x'], cl['y'], size, size);
	};
	map.push({'x':x,'y':y}); //将数据添加到原数组尾部
	cxt.fillStyle = "#006699";//内部填充颜色
	cxt.strokeStyle = "#006699";//边框颜色

	cxt.fillRect(x, y, size, size);//绘制矩形
	if((ax*8)==x && (ay*8)==y){ //吃食物
		rand_frog();
		t++;
	}
}
document.onkeydown = function(e) { //改变蛇方向
	var code = e.keyCode;
	switch(code){
		case 87 : direction = 1;
		set_game_speed();
		break;//上
		case 68 : direction = 2;
		set_game_speed();
		break;//右
		case 83 : direction = 3;
		set_game_speed();
		break;//下
		case 65 : direction = 0;
		set_game_speed();
		break;//左
	}
	
}
// // 随机放置食物
function rand_frog(){
	ax = Math.ceil(Math.random()*100);
	ay = Math.ceil(Math.random()*30);
	cxt.fillStyle = "#000000";//内部填充颜色
	cxt.strokeStyle = "#000000";//边框颜色
	cxt.fillRect(ax*8, ay*8, 8, 8);//绘制矩形
}
// 随机放置食物
rand_frog();
