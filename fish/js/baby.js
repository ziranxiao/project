var  babyObj = function (){
	this.x;
	this.y;
	this.angle;	
	
	this.babyTailsTimer = 0;
	this.babyTailsCount = 0;//当前帧
	
	this.babyEyesTimer = 0;
	this.babyEyesCount = 0;
	this.babyEyeInterval = 1000;//执行时间
	
	this.babyBodysTimer = 0;
	this.babyBodysCount = 0;
}

babyObj.prototype.init = function (){
	this.x = canwidth * 0.5 -50;
	this.y = canheight * 0.5 - 50;
	this.angle = 0;
}

babyObj.prototype.draw = function (){
	ctx1.save();
	//圆点坐标
	ctx1.translate(this.x,this.y);//0,0
	ctx1.rotate(this.angle);//旋转画布
	var babyTailsCount = this.babyTailsCount;
	//先画的在下面，后画的在前面。
	ctx1.drawImage(babyTails[babyTailsCount],-babyTails[babyTailsCount].width * 0.5+23,-babyTails[babyTailsCount].height * 0.5);
	var babyBodysCount = this.babyBodysCount;
	ctx1.drawImage(babyBodys[babyBodysCount],-babyBodys[babyBodysCount].width * 0.5,-babyBodys[babyBodysCount].height * 0.5);
	var babyEyesCount = this.babyEyesCount;
	ctx1.drawImage(babyEyes[babyEyesCount],-babyEyes[babyEyesCount].width * 0.5,-babyEyes[babyEyesCount].height * 0.5);//因为图片本身也是有大小的。
	
	ctx1.restore();
	
	//小鱼移动
	//lerp x,y
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	//角度差 delta angle
	//Math.atan2(y,x)
	var deltaY =mom.y - this.y;//大鱼和鼠标的坐标差
	var deltaX = mom.x- this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//鼠标和大鱼的角度差。atan2（）的返回值范围： -PT,PI 
	
	//lerp angle   大鱼的角度趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.6);

	//baby tail count
	this.babyTailsTimer += deltaTime;
	if(this.babyTailsTimer >50){
		this.babyTailsCount = (this.babyTailsCount+1)%8;//(0,8)之间循环
		this.babyTailsTimer=this.babyTailsTimer%50;
	}
	
	//baby eye
	this.babyEyesTimer += deltaTime;
	if(this.babyEyesTimer > this.babyEyeInterval){
		this.babyEyesCount = (this.babyEyesCount +1)%2;
		this.babyEyesTimer %=this.babyEyeInterval;
		
		if(this.babyEyesCount ==0){
			this.babyEyeInterval =Math.random() *1500+2000//[0,1]
		}else{
			this.babyEyeInterval =200;
		}
	}
	
	//baby body
	this.babyBodysTimer += deltaTime;
	if(this.babyBodysTimer >300){
		this.babyBodysCount = this.babyBodysCount+1;
		this.babyBodysTimer %=300;
		if(this.babyBodysCount >19){
			this.babyBodysCount = 19;
			//同时提示game over
			data.gameOver = true;
			//同时大鱼的身体颜色变回最初色，白色。
			mom.momBodysCount = 0;
		}
	}
	
}
