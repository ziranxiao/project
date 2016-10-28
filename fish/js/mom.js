var momObj = function(){
	this.x;
	this.y;
	this.angle;
//	this.bigEye = new Image();
//	this.bigBody =new Image();
//	//this.bigTail =new Image();
	
	this.momTailsTimer = 0;
	this.momTailsCount = 0;//当前帧
	
	this.momEyesTimer = 0;
	this.momEyesCount = 0;
	this.momEyeInterval = 1000;//执行时间
	
	//this.momBodysTimer = 0;
	this.momBodysCount = 0;
}
 momObj.prototype.init = function(){
 	this.x= canwidth * 0.5;
 	this.y= canheight * 0.5;
 	this.angle = 0;//当前值
 }
momObj.prototype.draw = function(){
	//lerp x,y
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	//角度差 delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;//大鱼和鼠标的坐标差
	var deltaX = mx- this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//鼠标和大鱼的角度差。atan2（）的返回值范围： -PT,PI 
	
	//lerp angle   大鱼的角度趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.6);
	
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailsCount = this.momTailsCount;
	//先画的在下面，后画的在前面。
	ctx1.drawImage(momTails[momTailsCount],-momTails[momTailsCount].width * 0.5+30,-momTails[momTailsCount].height * 0.5);
	var momBodysCount = this.momBodysCount;

	ctx1.drawImage(momBodys[momBodysCount],-momBodys[momBodysCount].width * 0.5,-momBodys[momBodysCount].height * 0.5);
	var momEyesCount = this.momEyesCount;
	ctx1.drawImage(momEyes[momEyesCount],-momEyes[momEyesCount].width * 0.5,-momEyes[momEyesCount].height * 0.5);//因为图片本身也是有大小的。
	ctx1.restore();
	
	//mom tail count
	this.momTailsTimer += deltaTime;
	if(this.momTailsTimer >50){
		this.momTailsCount = (this.momTailsCount+1)%8;//(0,8)之间循环
		this.momTailsTimer=this.momTailsTimer%50;
	}
	
	
	//mom eye
	this.momEyesTimer += deltaTime;
	if(this.momEyesTimer > this.momEyeInterval){
		this.momEyesCount = (this.momEyesCount +1)%2;
		this.momEyesTimer %=this.momEyeInterval;		
		if(this.momEyesCount ==0){
			this.momEyeInterval =Math.random() *1500+2000;//[0,1]
		}else{
			this.momEyeInterval =200;
		}
	}
	
	//baby body
	this.momBodysTimer += deltaTime;
	if(this.momBodysTimer >300){
		this.momBodysCount = this.momBodysCount+1;
		this.momBodysTimer %=300;
		if(this.momBodysCount >19){
			this.momBodysCount = 19;
			//同时提示game over
		}
	}
}
