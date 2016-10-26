var fruitObj = function (){
	this.alive = [];//bool
	this.x = [];
	this.y = [];
	this.fruitType=[];
	this.l =[];//图片长度
	this.speed=[];//成长的速度、往上飘的速度
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;//果实的数量
fruitObj.prototype.init = function(){
	for (var i = 0;i< this.num;i++) {
		this.alive[i] = false;
		this.x[i]=0;
		this.y[i]=0;
		this.speed[i] =Math.random() * 0.017+0.003;//[0.003,0.020)
		this.fruitType[i]= "";
	
	}
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}
fruitObj.prototype.draw = function(){ 
	for (var i=0;i<this.num;i++) {
		//draw
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic =this.blue;
			}else{
				var pic =this.orange;
			}
			if(this.l[i]<=14){
				this.l[i]+=this.speed[i] * deltaTime;
			}else{
				this.y[i]-=this.speed[i] * 7 * deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i] *0.5,this.y[i]-this.l[i] * 0.5,this.l[i],this.l[i]);
			//find a ane,grow,fly up
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}
		
		
	}	
}

fruitObj.prototype.born = function(i){
	var aneId = Math.floor(Math.random()*ane.num);
	this.x[i] =ane.x[aneId];
	this.y[i] =canheight - ane.y[aneId];
	this.l[i]= 0;
	this.alive[i]=true;
	var ran = Math.random();
	if(ran<0.2){
		this.fruitType[i]=  "blue";//orange,blue
	}else{
		this.fruitType[i]=  "orange";//orange,blue
	}
	
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
function fruitMonitor(){
	var num = 0;
	for (var i = 0;i<fruit.num;i++) {
		if(fruit.alive[i]) num++;//判断屏幕上有多少果实
	}
	if(num <15){
		//send fruit
		sendfruit();
		return;
	}
	
}

//判断闲置果实
function sendfruit(){
	for (var i=0;i<fruit.num;i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}

fruitObj.prototype.update = function(){
	var num =0;
	for (var i =0;i<this.num;i++) {
		if(this.alive[i]) num++;
	}
}

