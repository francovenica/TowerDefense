var statsFontSize = 15;
var startX = 5;
var startY = 20;
var newLine = 15;
var startWaveStatsY = 60;
var startTowerStatsY = 150;

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

drawStats = function(gold, lives)
{
	stats.save();
	stats.fillStyle = "white";
	stats.font = statsFontSize + "px Georgia"
	stats.fillText("Lives: " + lives, startX, startY);
	stats.fillText("Gold: " + gold.toFixed(0) , startX, startY + newLine);
	
	if ( waves[currentActiveWave] != undefined && waves[currentActiveWave].enemyForStats != undefined)
	{
	stats.fillText("Wave: " + waves[currentActiveWave].id, startX, startWaveStatsY);
	stats.fillText("Health: " + waves[currentActiveWave].enemyForStats.health , startX, startWaveStatsY + newLine);
	stats.fillText("Speed: " + waves[currentActiveWave].enemyForStats.spd , startX, startWaveStatsY + newLine * 2);
	stats.fillText("Gold: " + waves[currentActiveWave].enemyForStats.gold , startX, startWaveStatsY + newLine * 3);
	stats.fillText("Damage: " + waves[currentActiveWave].enemyForStats.damage , startX, startWaveStatsY + newLine * 4);
	}
	else
	{
	stats.fillText("Wave: " + (currentActiveWave + 1), startX, startWaveStatsY);
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
		stats.fillRect(startX,300,40,40);
	}
	else if(player.optionTowerSelected == "2"){
		stats.fillRect(startX,345,40,40);
	}
	else if(player.optionTowerSelected == "3"){
		stats.fillRect(startX,390,40,40);
	}
	
	stats.strokeStyle = "white";
	stats.fillStyle = "white";
	stats.strokeRect(startX,300,40,40);
	stats.font = "30px Georgia"
	stats.fillText("1", startX + 13, 326);
	if (gold < 250)
		stats.fillStyle = "red";
	stats.font = "20px Georgia";
	stats.fillText("250 gold", startX + 45, 326);
	
	stats.fillStyle = "white";
	stats.strokeRect(startX,345,40,40);
	stats.font = "30px Georgia"
	stats.fillText("2", startX + 12, 372);
	if (gold < 600)
		stats.fillStyle = "red";
	stats.font = "20px Georgia";
	stats.fillText("600 gold", startX + 45, 372);
	
	stats.fillStyle = "white";
	stats.strokeRect(startX,390,40,40);
	stats.font = "30px Georgia"
	stats.fillText("3", startX + 12, 416);
	if (gold < 1000)
		stats.fillStyle = "red";
	stats.font = "20px Georgia";
	stats.fillText("1000 gold", startX + 45, 418);
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