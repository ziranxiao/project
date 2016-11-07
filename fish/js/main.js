var can1;
var can2;

var ctx1;
var ctx2;
 var canwidth;
 var  canheight;
 
var lastTime;
//两帧执行的时间间隔
var deltaTime;

var bgPic = new Image();
var ane;
var fruit;

var mom;
var mx;//鼠标位置
var my;
var momTails =[];//尾部摆动
var momEyes =[];//眨眼睛
var momBodys =[];//身体颜色变化
var momBodyOrange = [];
var momBodyBlue = [];

var baby;
var babyTails =[];//尾部摆动
var babyEyes =[];//眨眼睛
var babyBodys =[];//身体颜色变化

var data;
var wave;
var halo;//小圈圈
window.onload = game;
function game(){
	//初始化
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
	
};

function init(){
	//h获得canvas context
	can1 = document.getElementById("canvas1");//canvas1 在前面
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");//canvas2 在后面
	ctx2 = can2.getContext("2d");
	
	can1.addEventListener('mousemove',onMouseMove,false);//大鱼随鼠标移动而运动。
	
	bgPic.src = "img/background.jpg";
	//获取画布的大小
	canwidth = can1.width;
	canheight = can1.height;
	
	ane = new aneObj();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	//mom
	mom = new momObj();
	mom.init();
	for(var i =0;i<8;i++){
		momTails[i] = new Image();
		momTails[i].src = "img/bigTail"+i+".png";
	}
	for(var i = 0;i <2;i++){
		momEyes[i] = new Image();
		momEyes[i].src ="img/bigEye"+i+".png";
	}
//
	for(var i =0; i<8;i++){
		momBodys[i] = new Image();
		momBodys[i].src = "img/bigEat"+i+".png";
	}
	//大鱼身体颜色变化
	for (var i = 0; i<8;i++){
		momBodyOrange[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOrange[i].src = "img/bigEat"+i+".png";
		momBodyBlue[i].src = "img/bigEatBlue"+i+".png";
	}
	mx = canwidth * 0.5;
	my = canheight * 0.5;
	
	//baby
	for(var i =0;i<8;i++){
		babyTails[i] = new Image();
		babyTails[i].src = "img/babyTail"+i+".png";
	}
	
	for(var i = 0;i <2;i++){
		babyEyes[i] = new Image();
		babyEyes[i].src ="img/babyEye"+i+".png";
	}
	
	for(var i =0; i<20;i++){
		babyBodys[i] = new Image();
		babyBodys[i].src = "img/babyFade"+i+".png";
	}
	baby = new babyObj();
	baby.init();
	
	//data
	data = new dataObj();
	
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
}

//游戏循环
function gameloop(){
	window.requestAnimationFrame(gameloop);//根据机器的性能。帧之间间隔不固定
	var now = new Date();//获取当前时间
	deltaTime = now - lastTime;//时间间隔且不是相等的。
	if(deltaTime>40) deltaTime = 40;
	lastTime = now;//更新下时间
	drawBackground();
	ane.draw();
	fruit.draw();
	fruitMonitor();
	ctx1.clearRect(0,0,canwidth,canheight);//原因是：如果不清除的话，那么会画在第二个画布上。
	mom.draw();
	
	momFruitsCollision()
	
	baby.draw();
	
	momBabyCollision();
	data.draw();
	wave.draw();
	halo.draw();
	
}

function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){
			mx = (e.offsetX ==undefined )? e.layerX : e.offsetX;
			my = (e.offsetY ==undefined )? e.layerY : e.offsetY;
		
		}
	}
	
}
