var haloObj = function (){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.r =[];
}
haloObj.prototype.num =10;
haloObj.prototype.init = function(){
	for (var i =0;i<this.num;i++) {
		this.alive[i]=false;
		this.r[i]=0;
	}
}
haloObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;//阴影
	ctx1.shadowColor = "white";
	for (var i = 0;i<this.num;i++) {
		 if(this.alive[i]){//当前可用
		 	this.r[i] += deltaTime*0.04;
		 	if(this.r[i] >50){
		 		this.alive[i] = false;
		 		break;//跳出本次循环，继续下次循环
		 	}		 		
		 	var alpha = 1 -this.r[i] / 50;//透明度与半径成反比	
		 	 //draw 圆
		 	 ctx1.beginPath();		 	
		 	 ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
		 	 //ctx1.arc(100,75,50,0,2*Math.PI);
		 	 ctx1.closePath();
		 	 ctx1.strokeStyle = "rgba(255,118,75,"+alpha+")";//描边
		 	 ctx1.stroke();			 	
		 }
	}
	ctx1.restore();
}
haloObj.prototype.born = function(x,y){
	for (var i = 0; i <this.num;i++) {
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=5;
			this.x[i] = x;
			this.y[i] = y;
			return;//找到一个，跳出循环，不然所有满足条件的都出生
		}
	}
}
