var wave = function(id, amountEnemies, spawnTime, enemyPosX, enemyPosY, enemyNextX, enemyNextY){
	var w = {
		id: id,
		amountEnemies:amountEnemies,
		spawnTime:spawnTime,
		lastCreatedDate: 0,
		active: false,
		keepCreating: true,
	}
	
	w.enemies = [];
	w.enemyForStats;
	
	w.generateEnemies = function(){
		//para hacer variar a los monstruos un poco hasta que realice objetos mejor hechos.
		//var spd = Math.floor((Math.random() * 2) + 1);
		var spd = 1;
		var colors = ["blue", "#5B00B5", "#009999", "black"];
		var colorSelected = Math.floor((Math.random() * colors.length));
		var health = Math.floor((Math.random() * 15) + 5);
		var gold = health * 2;
		var damage = 1;
		
		w.enemyForStats = enemy(-500, -500, 0, 0, spd, colors[colorSelected], health, gold, damage);
		//este enemigo suelto es para mostrarlo en la barra de stats.
		
		for ( var i = 0; i < w.amountEnemies ; i++){
		w.enemies.push(enemy(enemyPosX, enemyPosY - i * 40, enemyNextX, enemyNextY, spd, colors[colorSelected], health, gold, damage));
		}
		
	}
	
	w.setActiveInactive = function(){
		w.active = !w.active;
	}
	
	w.keepStopCreating = function(){
	w.keepCreating = !w.keepCreating;
	}
	
	return w;
}
