var enemy = function (posX,posY,nextX,nextY,spd,color,health,gold,damage){
	var ent = {
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
	health: health,
	gold: gold,
	damage: damage,	
	};
	
	ent.reduceHealthByHit = function(damage){
		ent.health-=damage;
	}
	
	return ent;
};