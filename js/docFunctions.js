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
				var newTower = tower(towers.length, "archer",  x, y, 100, "red", 4, 2 , 200, 250);
				break;
			case "2":
				var newTower = tower(towers.length, "cannon", x, y, 50, "orange", 4, 10 ,1000, 600);
				break;
		}
			newTower.fixCenter();
		
		if(newTower.checkTowerOverlap() && newTower.checkRoadOverlap(map1.x, map1.y, map1.roadWidth) && player.gold >= newTower.price && newTower.checkOutOfBoundaries()
			&& newTower.type != "0") //chequeo si la nueva torre se superpone con una existente
		{
			towers.push(newTower); //Creo una torre con un click y la pongo en el array de torres
			player.subtractingMoney(newTower.worth); //resto oro del jugador por comprar la torre
		}
		else
		{
			delete newTower; //si posicionar la torre falla la borro
		}
	}
	
	if (x> 10 && x <60 && y > 455 && y < 505)
	{//si hago click en el boton Play de abajo.
			
		if(waves[currentActiveWave] == undefined){
		var amountEnemies = Math.floor((Math.random() * 5) + 10);
		waves.push(wave( (currentActiveWave + 1) , amountEnemies, 500, map1.x[0], map1.y[0], map1.x[1], map1.y[1]));
		waves[currentActiveWave].setActiveInactive();
		}
	}
}

document.onmousemove = function(event){
        var mouseX = event.clientX - document.getElementById('ctx').getBoundingClientRect().left;
        var mouseY = event.clientY - document.getElementById('ctx').getBoundingClientRect().top;
		
		gTower.updatePos(mouseX-2,mouseY-2); //hay un defase por alguna razon (capaz el borde del canvas) entre la sombra que 
											//se muestra y la torre que se coloca. tuve que sacarle 2 px
}

document.onkeydown = function(event){
	switch (event.keyCode){
		case 49: // tecla "1"
			player.setOptionTowerSelected("1");
			break;
		case 50: // tecla "2"
			player.setOptionTowerSelected("2");
			break;
		case 88: // tecla "x"
			/*var towerIndex = 0;
			while (towers[towerIndex].id != selectedTower.id){
				towerIndex++; //Tengo que hacer esto aca porque al ir haciendo splice el indice de la torre se va corriendo y el index no es el mismo que el .id de la torre
			}*/
			
			if (selectedTower != undefined && selectedTower.inUse == false && towers.splice(selectedTower.id,1) != [])
			{ // si splice da distinto de [] significa que la torre se borro del arreglo towers
			for ( var key in towers)
			{
				towers[key].id = key;
			}
				if ( selectedTower.used )
					player.addingMoney(selectedTower.worth * .75); //si ya se uso la torre, esta vale solo 3/4 partes de su valor total (worth)
				else
					player.addingMoney(selectedTower.worth);
				selectedTower = undefined;
			}
			break;
		case 81: //tecla "q"
			if (selectedTower != undefined && selectedTower.level < 3 && player.gold > (selectedTower.upgrdePrice) && selectedTower.upgrade())
			{
				player.subtractingMoney(selectedTower.upgrdePrice);
				selectedTower.updateUpgradePrice();
			}
			break;
	}
}

document.onkeyup = function (event){
	player.setOptionTowerSelected("0"); //si no estoy aprentando ninguna tecla seguro deselecciono el boton
}