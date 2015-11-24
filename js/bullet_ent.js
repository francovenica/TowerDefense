var bullet = function(posX, posY, spd, dmg, splashRadious, enemy, towerType){
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
	ownerType: towerType, //si es cannon, va a tener splash damage
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
						for (var key in waves[currentActiveWave].enemies)
						{
							if ( b.enemyInSplashRadious(waves[currentActiveWave].enemies[key]) == "near")
							{
								waves[currentActiveWave].enemies[key].reduceHealthByHit(b.dmg) //si esta cerca del centro de la explocion recibe full damage
							}
							else if (b.enemyInSplashRadious(waves[currentActiveWave].enemies[key]) == "far")
							{
								waves[currentActiveWave].enemies[key].reduceHealthByHit(b.dmg/2) //si esta lejos del centro recibe solo la mitad del daño
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
		else if (Math.pow(enemy.posX - b.posX, 2) + Math.pow(enemy.posY - b.posY, 2) <= Math.pow(b.splashRadious,2))
		{
			return "far";
		}
		else
			return false;
	}	
	
	return b;
}
