var ghostTower = function(posX,posY){
	var gt = tower(posX,posY);
	gt.id = "ghostTower";
	gt.type = "ghostTower";
	gt.color = "grey";
	gt.range; 
	gt.imagen = new Image();
	gt.posiblePlace = true; //la imagen de la gt cambia si no se puede poner la torre donde se esta haciendo hover
	gt.price = 0;
	
	gt.drawEntity = function(){
		if(gt.posiblePlace){
		ctx.beginPath();
		ctx.arc(gt.posX,gt.posY,gt.range,0,2*Math.PI);
		ctx.stroke();
		ctx.restore();
		}
		if(gt.type != "ghostTower")
			gt.drawSprites();
		
	}
	
	gt.updatePos = function(x,y){
		gt.posX = x;
		gt.posY = y;
	}
	
	gt.setImageFramesSpritPos = function(){
		//Cada monstruo puede tener distinto ancho y alto de sprite, asi que necesita un switch para setear dichas medidas
	
		if (gTower.price > player.gold || !gTower.checkTowerOverlap() || !gTower.checkRoadOverlap(map1.x, map1.y, map1.roadWidth))
		{
			gt.posiblePlace = false;
			gt.imagen.src = "img/notAllowed.png";
			gt.sprwidth = 40;
			gt.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
		}
		else
		{
			gt.posiblePlace = true;
			switch(gt.type){
				case "iceTower":
					gt.imagen.src = "img/iceTower.png";
					gt.sprwidth = 160;
					gt.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
					break;
				case "archer":
					gt.imagen.src = "img/iceTower.png";
					gt.sprwidth = 160;
					gt.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
					break;
				case "cannon":
					gt.imagen.src = "img/iceTower.png";
					gt.sprwidth = 160;
					gt.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
					break;
			}
		}
		gt.numberOfFrames = gt.sprwidth / gt.sprheight ;
	}
	
	gt.notAllowed = function(){
		
	if (!gt.posiblePlace)
	{
		
	}
	
	}
	
	gt.setType = function(selection){
		//Para dibujar un sprite necesito saber que torre tengo seleccionada
		switch(selection){
			case "1":
				gt.price = towersForStats.archer.price;
				break;
			case "2":
				gt.price = towersForStats.cannon.price;
				break;
			case "3":
				gt.price = towersForStats.iceTower.price;
				break;
			default:
				gt.price = 0;
				break;
		}
	}
	
	gt.setPrice = function(selection){
		//Para dibujar un sprite necesito saber que torre tengo seleccionada
		switch(selection){
			case "1":
				gt.type = "archer";
				break;
			case "2":
				gt.type = "cannon";
				break;
			case "3":
				gt.type = "iceTower";
				break;
			default:
				gt.type = "ghostTower";
				break;
		}
	}
	
	gt.setRange = function(range){
		gt.range = range;
	}

	return gt;
}