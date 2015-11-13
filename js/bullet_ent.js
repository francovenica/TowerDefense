var bullet = function(posX, posY, spd, dmg, enemy){
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
					b.target.reduceHealthByHit(b.dmg);
					return true;
				 }	 
	}
	
	return b;
}
