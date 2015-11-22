var ghostTower = function(posX,posY){
	var gt = tower(posX,posY);
	gt.id = "ghostTower";
	gt.type = "ghostTower";
	gt.color = "grey";
	gt.range; 
	gt.imagen = new Image();
	
	gt.drawEntity = function(){
		ctx.beginPath();
		ctx.arc(gt.posX,gt.posY,gt.range,0,2*Math.PI);
		ctx.stroke();
		ctx.restore();
		//drawEntity(gt);
		if(gt.type != "ghostTower")
			gt.drawSprites();
	};
	
	gt.updatePos = function(x,y){
		gt.posX = x;
		gt.posY = y;
	}
	
	gt.setImageFramesSpritPos = function(){
		//Cada monstruo puede tener distinto ancho y alto de sprite, asi que necesita un switch para setear dichas medidas
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
		gt.numberOfFrames = gt.sprwidth / gt.sprheight ;
	}
	
	gt.setType = function(selection){
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