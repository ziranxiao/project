var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody =new Image();
	this.bigTail =new Image();
}
 momObj.prototype.init = function(){
 	this.x= canwidth * 0.5;
 	this.y= canheight * 0.5;
 	this.bigEye.src = "img/bigEye0.png";
 	this.bigBody.src = "img/bigSwim0.png";
 	this.bigTail.src = "img/bigTail0.png";
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
	ctx1.drawImage(this.bigTail,-this.bigTail.width * 0.5+30,-this.bigTail.height * 0.5);
	ctx1.drawImage(this.bigBody,-this.bigBody.width * 0.5,-this.bigBody.height * 0.5);
	ctx1.drawImage(this.bigEye,-this.bigEye.width * 0.5,-this.bigEye.height * 0.5);		
	ctx1.restore();
}
