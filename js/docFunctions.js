document.onclick = function(event){
    var x = event.clientX;
    var y = event.clientY;
	
	if (player.optionTowerSelected != "0"){ 
		switch(player.optionTowerSelected){
			case "1":
				//id,type, posX,posY,range, color, bulletSpeed, bulletDamage, atkSpeed, price
				var newTower = tower(player.optionTowerSelected, "archer",  x, y, 100, "red", 4, 2 , 200, 250);
				break;
			case "2":
				var newTower = tower(player.optionTowerSelected, "cannon", x, y, 50, "orange", 4, 10 ,1000, 600);
				break;
		}
			newTower.fixCenter();
		
		if(newTower.checkTowerOverlap() && newTower.checkRoadOverlap(map1.x, map1.y, map1.roadWidth) && player.money >= newTower.price && newTower.checkOutOfBoundaries()
			&& newTower.type != "0") //chequeo si la nueva torre se superpone con una existente
		{
			towers.push(newTower); //Creo una torre con un click y la pongo en el array de torres
			player.buyingTower(newTower.price);
		}
		else
		{
			delete newTower;
		}
	}
	else{
		//seleccionar la torre para update, borrar, etc...
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
		case 49:
			player.setOptionTowerSelected("1");
			break;
		case 50:
			player.setOptionTowerSelected("2");
			break;
	}
}

document.onkeyup = function (event){
	player.setOptionTowerSelected("0"); //si no estoy aprentando ninguna tecla seguro deselecciono el boton
}