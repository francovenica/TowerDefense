var statsFontSize = 15;
var startX = 5;
var startY = 20;
var newLine = 15;
var startWaveStatsY = 60;
var startTowerStatsY = 150;

drawEntity = function(entity){
	if(entity.id != "enemy"){
		ctx.save();
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.posX - entity.width/2,entity.posY - entity.height/2,entity.width,entity.height);	
        ctx.restore();	
	}
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

drawStats = function(gold, lives)
{
	stats.save();
	stats.fillStyle = "white";
	stats.font = statsFontSize + "px Times New Roman"
	stats.fillText("Lives: " + lives, startX, startY);
	stats.fillText("Gold: " + gold.toFixed(0) , startX, startY + newLine);
	
	if ( waves[currentActiveWave] != undefined && waves[currentActiveWave].enemyForStats != undefined)
	{
	stats.fillText("Wave: " + totalWavesPassed, startX, startWaveStatsY);
	stats.fillText("Health: " + Math.round(waves[currentActiveWave].enemyForStats.health) , startX, startWaveStatsY + newLine);
	stats.fillText("Speed: " + (waves[currentActiveWave].enemyForStats.spd).toFixed(1) , startX, startWaveStatsY + newLine * 2);
	stats.fillText("Gold: " + Math.round(waves[currentActiveWave].enemyForStats.gold) , startX, startWaveStatsY + newLine * 3);
	stats.fillText("Damage: " + waves[currentActiveWave].enemyForStats.damage , startX, startWaveStatsY + newLine * 4);
	}
	else
	{
	stats.fillText("Wave: " + totalWavesPassed, startX, startWaveStatsY);
	}	
	
	
	if ( selectedTower != undefined){
		stats.fillText("Selected Tower: ", startX, 150);
		stats.fillText("Power: " + (selectedTower.bulletDamage).toFixed(0) , startX, startTowerStatsY + newLine);
		stats.fillText("AtkSpeed: " + (1000/selectedTower.atkSpeed).toFixed(2)  + "/sec", startX, startTowerStatsY + newLine * 2);
		stats.fillText("Range: " + (selectedTower.range).toFixed(2) , startX, startTowerStatsY + newLine * 3);
		if (selectedTower.level < 3)
		{
			if ( selectedTower.upgradePrice > player.gold)
			{
				stats.fillStyle = "red";
				stats.fillText("Upgrade: " + (selectedTower.upgradePrice).toFixed(0)  , startX, startTowerStatsY + newLine * 4); 
			}
			else
			{
				stats.fillStyle = "white";
				stats.fillText("Upgrade: " + (selectedTower.upgradePrice).toFixed(0)  , startX, startTowerStatsY + newLine * 4);
			}
		}
		else
		{
			stats.fillStyle = "red";
			stats.fillText("Upgrade: MAX Reached"   , startX, startTowerStatsY + newLine * 4);
		}			
		stats.fillStyle = "white";
		if ( selectedTower.used)
			stats.fillText("Sell For: " + (selectedTower.worth * .75).toFixed(0)  , startX, startTowerStatsY + newLine * 5);
		else
			stats.fillText("Sell For: " + (selectedTower.worth).toFixed(0)  , startX, startTowerStatsY + newLine * 5);
	}
		stats.restore();
}

drawTowerOptions = function(gold){
	stats.save();
	stats.fillStyle = "red";
	if (player.optionTowerSelected == "1"){
		stats.fillRect(startX,300,26,26);
		stats.fillStyle = "white";
		if (gold < towersForStats.archer.price)
			stats.fillStyle = "red";
		stats.font = "20px Times New Roman";
		stats.fillText("250 gold", startX, 350);
		stats.font = "15px Times New Roman";
		stats.fillStyle = "white";
		stats.fillText("Archer tower: shoots at", startX, 380);
		stats.fillText("the enemy closest to the", startX, 395);
		stats.fillText("exit", startX, 410);
	}
	else if(player.optionTowerSelected == "2"){
		stats.fillRect(startX + 30,300,26,26);
		stats.fillStyle = "white";
		if (gold < towersForStats.cannon.price)
			stats.fillStyle = "red";
		stats.font = "20px Times New Roman";
		stats.fillText("750 gold", startX, 350);
		stats.font = "15px Times New Roman";
		stats.fillStyle = "white";
		stats.fillText("Cannon tower: It does splash", startX, 380);
		stats.fillText("damage. It shots to", startX, 395);
		stats.fillText("the enemy closest to the", startX, 410);
		stats.fillText("exit", startX, 425);
	}
	else if(player.optionTowerSelected == "3"){
		stats.fillRect(startX + 60,300,26,26);
		stats.fillStyle = "white";
		if (gold < towersForStats.iceTower.price)
			stats.fillStyle = "red";
		stats.font = "20px Times New Roman";
		stats.fillText("1000 gold", startX, 350);
		stats.font = "15px Times New Roman";
		stats.fillStyle = "white";
		stats.fillText("Ice Tower: Slows down the", startX, 380);
		stats.fillText("enemies in range", startX, 395);
	}
	
	stats.strokeStyle = "white";
	stats.fillStyle = "white";
	stats.font = "15px Arial"
	stats.strokeRect(startX,300,26,26);
	stats.fillText("1", startX + 9, 318);
	stats.strokeRect(startX + 30,300,26,26);
	stats.fillText("2", startX + 39, 318);
	stats.strokeRect(startX + 60,300,26,26);
	stats.fillText("3", startX + 69, 318);

	stats.restore();
}
	

drawPlayButton = function(){
	ctx.save();
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.strokeRect(5,450,45,45);
	ctx.fillRect(5,450,45,45);
	ctx.beginPath();
	ctx.moveTo(20,460);
	ctx.lineTo(40,472);
	ctx.lineTo(20,484);
	ctx.lineTo(20,460);
	ctx.strokeStyle="red";
	ctx.fillStyle="red";
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

//drawSprites = function(){}