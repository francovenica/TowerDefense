var enemy = function (posX,posY,nextX,nextY,spd,color,health,gold,damage){
	var e = {
	id:"enemy",
	posX: posX,
	posY: posY,
	nextX: nextX,
	nextY: nextY,
	spd: spd,
	width:20,
	height:20,
	color: color,
	movement: 0,
	direction : "horizontal",
	maxHealth: health,
	health: health,
	gold: gold,
	damage: damage,	
	HealthBarColor: "green",
	HealthBarX: posX,
	HealthBarY: posY - 17,
	};
	
	e.reduceHealthByHit = function(damage){
		e.health-=damage;
	}
	
	e.updateHealthBarPosition = function(){
		var barFix = e.health*2/2
		e.HealthBarX = e.posX - barFix; //barfix centra la barra
		e.HealthBarY = e.posY - 17;
	}
	
	e.drawEntity = function() {
	drawEntity(e);
	if ( e.health < e.maxHealth/2 )
		e.HealthBarColor = "red";
	ctx.save();
	ctx.fillStyle = e.HealthBarColor;
	ctx.fillRect(e.HealthBarX, e.HealthBarY, e.health*2 , 5);
	ctx.strokeStyle = "black";
	ctx.strokeRect(e.HealthBarX, e.HealthBarY, e.health*2 , 5);
    ctx.restore();
	}
	
	return e;
};