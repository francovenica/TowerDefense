var enemy = function (posX,posY,nextX,nextY,spd,color,health,gold,damage){
	var e = {
	id:"enemy",
	posX: posX,
	posY: posY,
	nextX: nextX,
	nextY: nextY,
	spd: spd, 
	NormalSpd: spd, //Los enemigos pueden reducir su velocidad, por eso guardo la velocidad base para restaurarla despues
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
		if ( damage > e.health)
			e.health = 0;
		else
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
	
	e.slowDownBy = function(amount){
		e.spd =  amount;
	}
	
	e.NormalSpeed = function(){
		e.spd = e.NormalSpd;
	}
	
	return e;
};