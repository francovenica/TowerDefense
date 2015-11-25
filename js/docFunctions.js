document.onclick = function(event){
	
    var x = event.clientX;
    var y = event.clientY;
	var wasTowerSelected = false;
	
	for (var key in towers){ 
		if (towers[key].clickedOnMe(x,y))
		{
			wasTowerSelected = true;
			selectedTower = towers[key];
		}
	}
	
	if(!wasTowerSelected && selectedTower != undefined){
		//este if des selecciona la torre si se clickea en el mapa
		selectedTower = undefined;
		}
	
	if (player.optionTowerSelected != "0"){ 
		switch(player.optionTowerSelected){
			case "1":
				//id,type, posX,posY,range, color, bulletSpeed, bulletDamage, atkSpeed, price
				var newTower = tower(towers.length, "archer",  x, y, 75, "red", 4, 2 , 200, 250);
				break;
			case "2":
				//id,type, posX,posY,range, color, bulletSpeed, bulletDamage, splashradious, atkSpeed, price
				var newTower = cannonTower(towers.length, "cannon", x, y, 50, "orange", 4, 6 , 50,1000, 750);
				break;
			case "3":
				var newTower = iceTower(towers.length, "iceTower", x, y, 40, "#3399ff" /*Celeste hielo*/, 0, .8 ,0, 1000);
				break;
		}
			newTower.fixCenter();
			
		if(newTower.checkTowerOverlap() && newTower.checkRoadOverlap(map1.x, map1.y, map1.roadWidth) && player.gold >= newTower.price && newTower.checkOutOfBoundaries()
			&& newTower.type != "0") //chequeo si la nueva torre se superpone con una existente
		{
			towers.push(newTower); //Creo una torre con un click y la pongo en el array de torres
			newTower.setImageFramesSpritPos();
			if ( newTower.type == "iceTower"){
				iceTowers.push(newTower); //guardo las torres de hielo en otro lugar porque tengo que hacer una logica loca para que funcionen bien
				iceTowers.sort(function(a,b){return a.bulletDamage - b.bulletDamage});
			}
			player.subtractingMoney(newTower.worth); //resto oro del jugador por comprar la torre
		}
		else
		{
			delete newTower; //si posicionar la torre falla la borro
		}
	}
	
	if (x> 10 && x <60 && y > 455 && y < 505)
	{//si hago click en el boton Play de abajo.
		
		if(waves[currentActiveWave] == undefined)
		{
		var amountEnemies = Math.floor((Math.random() * 10) + 10);
		
		waves.push(wave( (currentActiveWave + 1) , amountEnemies, 1000, map1.x[0], map1.y[0], map1.x[1], map1.y[1]));
		waves[currentActiveWave].setActiveInactive();
		}
	}
}

document.onmousemove = function(event){
        var mouseX = event.clientX - document.getElementById('ctx').getBoundingClientRect().left;
        var mouseY = event.clientY - document.getElementById('ctx').getBoundingClientRect().top;
		
		if(gTower != undefined){
			gTower.updatePos(mouseX,mouseY); //hay un defase por alguna razon (capaz el borde del canvas) entre la sombra que 
											//se muestra y la torre que se coloca. tuve que sacarle 2 px
		}
		
		
		
		
}

document.onkeydown = function(event){
	switch (event.keyCode){
		case 49: // tecla "1"
			player.setOptionTowerSelected("1");
			break;
		case 50: // tecla "2"
			player.setOptionTowerSelected("2");
			break;
		case 51: // tecla "3"
			player.setOptionTowerSelected("3");
			break;
		case 88: // tecla "x"
			if (selectedTower != undefined )
			{
				var towerSold = towers[selectedTower.id]; //guardo la torre
			}
			if (selectedTower != undefined && selectedTower.inUse == false && towers.splice(selectedTower.id,1) != [])
			{ // si splice da distinto de [] significa que la torre se borro del arreglo towers
			
				if ( towerSold.type == "iceTower")
				{
					if (waves[currentActiveWave] != undefined)
					{
					//si la torre que borre es de hielo, tengo que descongelar todos los enemigos en rango
					for (var key in waves[currentActiveWave].enemies){
						waves[currentActiveWave].enemies[key].normalSpeed();
					}
					}
					iceTowers.splice(iceTowers.indexOf(towerSold),1);
					console.log(iceTowers);
				}
				for ( var key in towers)
				{  //vuelvo a ajustar el id de las torres que guarda su posicion en el array
					towers[key].id = key;
				}
					if ( selectedTower.used )
						player.addingMoney(selectedTower.worth * .75); //si ya se uso la torre, esta vale solo 3/4 partes de su valor total (worth)
					else
						player.addingMoney(selectedTower.worth);
					selectedTower = undefined;
					
					iceTowers.sort(function(a,b){return a.bulletDamage - b.bulletDamage}); //si se borro una torre de hielo, tengo que reordenar el arreglo
			}
			break;
		case 81: //tecla "q"
			if (selectedTower != undefined && selectedTower.level < 3 && player.gold > (selectedTower.upgradePrice) && selectedTower.upgrade())
			{
				player.subtractingMoney(selectedTower.upgradePrice);
				selectedTower.updateUpgradePrice();
				iceTowers.sort(function(a,b){return a.bulletDamage - b.bulletDamage}); //si se upgradeo una torre de hielo tengo que reordenar todo
			}
			break;
	}
	gTower.setType(player.optionTowerSelected);
	gTower.setPrice(player.optionTowerSelected)
	gTower.setImageFramesSpritPos();
}

document.onkeyup = function (event){
	player.setOptionTowerSelected("0"); //si no estoy aprentando ninguna tecla seguro deselecciono el boton
	gTower.setType(player.optionTowerSelected);
	gTower.setImageFramesSpritPos();
}