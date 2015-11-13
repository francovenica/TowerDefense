
drawEntity = function(entity){
        ctx.save();
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.posX - entity.width/2,entity.posY - entity.height/2,entity.width,entity.height);	
        ctx.restore();
}

drawMap = function(map){

	ctx.fillStyle = map.color;
	var drawLine;
	for ( var i = 0; i < map.x.length ; i++){
	
		if ( typeof map.x[i+1] !== "undefined" && map.x[i+1] == map.x[i]){
		drawLine = map.y[i+1] - map.y[i];
		ctx.fillRect(map.x[i] - map.roadWidth/2,map.y[i] - map.roadWidth/2,map.roadWidth,drawLine);
		}
		
		if ( typeof map.y[i+1] !== "undefined" && map.y[i+1] == map.y[i]){
		drawLine = map.x[i+1] - map.x[i];
		ctx.fillRect(map.x[i] - map.roadWidth/2,map.y[i] - map.roadWidth/2,drawLine+map.roadWidth,map.roadWidth);
		}
		
		ctx.fillStyle = "black"; //los puntitos en cada esquina
		ctx.fillRect(map.x[i]-1,map.y[i]-1, 3, 3);
		ctx.fillStyle = map.color;
	}
		
}

drawStats = function(money, lives){
	stats.save();
	stats.fillStyle = "white";
	stats.font = "20px Georgia"
	stats.fillText("Lives: " + lives, 20, 30);
	stats.fillText("Money: " + money, 20, 50);
	
	if ( waves[currentActiveWave] != undefined && waves[currentActiveWave].enemyForStats != undefined)
	{
	stats.fillText("Wave: " + waves[currentActiveWave].id, 20, 70);
	stats.fillText("Current Enemy:", 20, 100);
	stats.fillText("Health: " + waves[currentActiveWave].enemyForStats.health , 20, 120);
	stats.fillText("Speed: " + waves[currentActiveWave].enemyForStats.spd , 20, 140);
	stats.fillText("Gold: " + waves[currentActiveWave].enemyForStats.gold , 20, 160);
	stats.fillText("Damage: " + waves[currentActiveWave].enemyForStats.damage , 20, 180);
	}
	else
	{
	stats.fillText("Wave: " + (currentActiveWave + 1), 20, 70);
	}	
	
	
	if ( selectedTower != undefined){
		stats.fillText("Selected Tower: ", 20, 210);
		stats.fillText("Power: " + selectedTower.bulletDamage, 20, 230);
		stats.fillText("AtkSpeed: " + 1000/selectedTower.atkSpeed + "/sec", 20, 250);
		stats.fillText("Range: " + selectedTower.range , 20, 270);
		stats.fillText("Id: " + selectedTower.id , 20, 290);
	}
	
	stats.fillStyle = "red";
	if (player.optionTowerSelected == "1"){
		stats.fillRect(20,300,40,40);
	}
	else if(player.optionTowerSelected == "2"){
		stats.fillRect(20,360,40,40);
	}
	
	stats.strokeStyle = "white";
	stats.fillStyle = "white";
	stats.strokeRect(20,300,40,40);
	stats.font = "30px Georgia"
	stats.fillText("1", 33, 326);
	if (money < 250)
		stats.fillStyle = "red";
	stats.font = "20px Georgia";
	stats.fillText("250 gold", 73, 326);
	
	stats.fillStyle = "white";
	stats.strokeRect(20,360,40,40);
	stats.font = "30px Georgia"
	stats.fillText("2", 32, 387);
	if (money < 600)
		stats.fillStyle = "red";
	stats.font = "20px Georgia";
	stats.fillText("600 gold", 73, 387);
	
	
	
	stats.restore();

}

drawPlayButton = function(){
	ctx.save();
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.strokeRect(5,450,45,45);
	ctx.fillRect(5,450,45,45);
	ctx.restore();
}