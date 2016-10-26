var aneObj = function(){
	this.x = [];
	this.y = [];
}
aneObj.prototype.num = 50;
//初始化
aneObj.prototype.init = function(){
	for (var i = 0;i< this.num;i++) {
		this.x[i] = i * 16+Math.random() * 20 //random[0,1)
		this.y[i] = 200 + Math.random() *50;//海葵高度
	}
}
//绘制海葵
aneObj.prototype.draw = function(){
	
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";//结束位置
	for (var i=0;i<this.num;i++ ) {
		//beginPath,moveTo,lineTo,stroke,strokeStyle,line。。。
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canheight);
		ctx2.lineTo(this.x[i],canheight-this.y[i]);		
		ctx2.stroke();		
	}
	ctx2.restore();
}
