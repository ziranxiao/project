//判断大鱼和果实的距离
function momFruitsCollision(){
	for(var i=0; i<fruit.num;i++){
		if(fruit.alive[i]){
			//canculate length
			var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
			if (l < 900){
				//fruit eat
				fruit.dead(i);
			}
		}
	}
}

//大鱼喂小鱼
function momBabyCollision(){
	var l = calLength2(mom.x,mom.y,baby.x,baby.y);
	if(l<900){
		//小鱼吃到实物，身体颜色发生变化，帧从头开始
		baby.babyBodysCount = 0;
	}
}
