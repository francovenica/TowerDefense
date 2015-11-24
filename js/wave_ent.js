var wave = function(id, amountEnemies, spawnTime, enemyPosX, enemyPosY, enemyNextX, enemyNextY){
	var w = {
		id: id,
		amountEnemies:amountEnemies,
		spawnTime:spawnTime,
		lastCreatedDate: 0,
		active: false,
		keepCreating: true,
		healthIncrement: 1.2,
	}
	
	w.enemies = [];
	w.enemyForStats;
	
	w.enemyStats = {
		type: typesOfMonsters[Math.floor((Math.random() * typesOfMonsters.length))],
		spd: (Math.random() * 1.5) + 0.5,
		//spd: 0.4, //para debug
		health:  10,
		damage: 1,
	}
	
	w.enemyStats.gold = w.enemyStats.health * 2; //Tengo que crear el oro por separado porque se genera en funcion de la vida y la vida se crea en el objeto. No podes definir un atributo
						//de un objeto en base a un  atributo del mismo objeto.
	
	w.generateEnemies = function(){
		console.log(waves.length);
		
		if (waves.length > 1){ //si es la 2da oleada o mas
		console.log("algo");
		w.enemyStats.health = waves[0].enemyStats.health * w.healthIncrement;
		w.enemyStats.gold = Math.round(w.enemyStats.health) * 2;
		console.log(waves[0].enemyStats.health + " " + w.enemyStats.health);
		}
		
		w.enemyForStats = enemy(w.enemyStats.type, -500, -500, 0, 0, w.enemyStats.spd, w.enemyStats.health, w.enemyStats.gold, w.enemyStats.damage);
		//este enemigo suelto es para mostrarlo en la barra de stats.
		
		
		for ( var i = 0; i < w.amountEnemies ; i++){
		w.enemies.push(enemy(w.enemyStats.type, enemyPosX, enemyPosY - i * 50, enemyNextX, enemyNextY, w.enemyStats.spd, w.enemyStats.health, w.enemyStats.gold, w.enemyStats.damage));
		w.enemies[w.enemies.length-1].setImageFramesSpritPos();
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
