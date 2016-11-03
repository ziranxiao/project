//判断大鱼和果实的距离
function momFruitsCollision(){	
		for(var i=0; i<fruit.num;i++){
			if(fruit.alive[i]){
				//canculate length
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
				if (l < 900){
					//fruit eat
					fruit.dead(i);				
					data.fruitNum++;//果实的数量
					mom.momBodysCount++;
					if(mom.momBodysCount > 7)
						mom.momBodysCount = 7;
					if(fruit.fruitType[i]=="blue"){
						data.double = 2;
					}else{
						data.double = 1;
					}
				}
			}
		}
	
	
}

//大鱼喂小鱼
function momBabyCollision(){	
	if(!data.gameOver){
		if(data.fruitNum > 0){
			var l = calLength2(mom.x,mom.y,baby.x,baby.y);
			if(l<900){
			//小鱼吃到实物，身体颜色发生变化，帧从头开始
				baby.babyBodysCount = 0;
				//data = 0
				//data.reset();
				//大鱼碰上小鱼之后，大鱼身体颜色恢复原状,帧为0
				mom.momBodysCount = 0;
				//score update
				data.addScore();		
			}
		}	
	}
}
