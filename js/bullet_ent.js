var bullet = function(posX, posY, spd, dmg, splashRadious, enemy){
	var b = {
	id: "bullet",
	posX: posX,
	posY: posY,
	height: 4,
	width: 4,
	spd: spd,
	dmg: dmg, 
	color: "yellow",
	target: enemy,
	splashRadious: splashRadious,
	}
	
	b.persuitEnemy = function()
	{
		if (b.target.posX < b.posX) b.posX -= spd;
		else b.posX += spd;
		if (b.target.posY < b.posY) b.posY -= spd;
		else b.posY += spd;
	}
	
	b.drawEntity = function(){
		drawEntity(b);
	}
	
	b.collideWithEnemy = function(){

		if ( Math.abs(b.posX - b.target.posX) < b.target.width &&
			 Math.abs(b.posY - b.target.posY) < b.target.height)
				 {
					if  (b.splashRadious == 0)
					{
						b.target.reduceHealthByHit(b.dmg);
					}
					else
					{
						if ( b.target != undefined)
						{   //Alguna bala anterior puede matar a un enemigo antes que la bala nueva le pegue, y queda volando. Tengo que chequear que el enemigo exista si quiero seguir
							//con este for()
							for (var key in waves[currentActiveWave].enemies)
							{
								switch( b.enemyInSplashRadious(waves[currentActiveWave].enemies[key]))
								{
									case "near":
										waves[currentActiveWave].enemies[key].reduceHealthByHit(b.dmg)
										break;
									case "mid": 
										waves[currentActiveWave].enemies[key].reduceHealthByHit(b.dmg/2);
										break;
									case "far": 	
										waves[currentActiveWave].enemies[key].reduceHealthByHit(b.dmg/3);
										break;
								}
								
							}
						}						
					}
					return true;
				 }	 
	}
	
	b.enemyInSplashRadious = function(enemy){

		if (Math.pow(enemy.posX - b.posX, 2) + Math.pow(enemy.posY - b.posY, 2) <= Math.pow(b.splashRadious/2,2))
		{
			return "near";
		}
		else if (Math.pow(enemy.posX - b.posX, 2) + Math.pow(enemy.posY - b.posY, 2) <= Math.pow(b.splashRadious/1.5,2))
		{
			return "mid";
		}
		else if (Math.pow(enemy.posX - b.posX, 2) + Math.pow(enemy.posY - b.posY, 2) <= Math.pow(b.splashRadious,2))
		{
			return "far";
		}
		else
			return false;
	}	
	
	return b;
}
