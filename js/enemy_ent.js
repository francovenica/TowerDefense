var enemy = function (type,posX,posY,nextX,nextY,spd,color,health,gold,damage){
	var e = {
	id:"enemy",
	type: type,
	posX: posX,
	posY: posY,
	nextX: nextX,
	nextY: nextY,
	spd: spd, 
	NormalSpd: spd, //Los enemigos pueden reducir su velocidad, por eso guardo la velocidad base para restaurarla despues
	width:20,
	height:20,
	color: color,
	movement: 0,
	direction : "horizontal",
	maxHealth: health,
	health: health,
	gold: gold,
	damage: damage,	
	healthBarColor: "green",
	healthBarX: posX,
	healthBarY: posY - 17,
	freezed : false,
	};
	
	e.tickCount = 0;
	e.ticksPerFrame = 10; //mas alto significa menos velocidad de transicion entre frames
	e.frameIndex = 0;
	
	e.setImageFramesSpritPos = function(){
		//Cada monstruo puede tener distinto ancho y alto de sprite, asi que necesita un switch para setear dichas medidas
		switch(e.type){
			case "knight":
				e.imagen = new Image();
				e.imagen.src = "img/knight.png";
				e.sprwidth = 160;
				e.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
				break;
			case "chomp":
				e.imagen = new Image();
				e.imagen.src = "img/chomp.png";
				e.sprwidth = 240;
				e.sprheight = 40; 
				break;
			case "wizard":
				e.imagen = new Image();
				e.imagen.src = "img/wizard.png";
				e.sprwidth = 160;
				e.sprheight = 40; 
				break;
			case "dragon":
				e.imagen = new Image();
				e.imagen.src = "img/dragon.png";
				e.sprwidth = 160;
				e.sprheight = 40; 
				break;
		}
		e.numberOfFrames = e.sprwidth / e.sprheight ;
	}
	
	e.reduceHealthByHit = function(damage){
		if ( damage > e.health)
			e.health = 0;
		else
			e.health-=damage;
	}
	
	e.updateHealthBarPosition = function(){
		var barFix = e.health*2/2
		e.healthBarX = e.posX - barFix; //barfix centra la barra
		e.healthBarY = e.posY - 28;
	}
	
	e.drawEntity = function() {
	
	drawEntity(e);
	if ( e.health < e.maxHealth/2 )
		e.healthBarColor = "red";
	ctx.save();
	ctx.fillStyle = e.healthBarColor;
	ctx.fillRect(e.healthBarX, e.healthBarY, e.health*2 , 5);
	ctx.strokeStyle = "black";
	ctx.strokeRect(e.healthBarX, e.healthBarY, e.health*2 , 5);
    ctx.restore();
	
	/*ctx.fillStyle = "yellow"; //dibuja el centro del enemigo con un punto amarillo, para debug nomas
	ctx.fillRect(e.posX, e.posY, 3 , 3);*/
	e.drawSprites();
	}
	
	e.drawSprites = function(){
		e.updImg();
		ctx.drawImage(e.imagen, //la imagen
				e.frameIndex * e.sprwidth / e.numberOfFrames, // Donde tiene que cortar en px a lo ancho [que frame] * frame ancho / numero de frames que hay
				0, // donde tiene que empezar a cortar a lo alto
				e.sprwidth / e.numberOfFrames, //ancho de la imagen total
				e.sprheight, //alto de la imagen total
				e.posX - 20, //donde lo ubica X
				e.posY - 20, //donce lo ubica Y
				e.sprwidth / e.numberOfFrames, //cuan ancho va a dibjuar. el ancho de la imagen / numero de frames / 2 para que quede de 20x20
				e.sprheight  //cuan alto va a dibjuar. / 2 para que quede de 20x20
				);
	}
	
	e.updImg = function () {
            e.tickCount += 1;

            if (e.tickCount > e.ticksPerFrame) {

				e.tickCount = 0;
				
                // If the current frame index is in range
                if (e.frameIndex < e.numberOfFrames - 1) {	
					
                    // Go to the next frame
                    e.frameIndex += 1;
                } else {
                    e.frameIndex = 0;
                }
            }
        }
	
	e.slowDownBy = function(amount){
		e.spd =  e.NormalSpd * amount;
	}
	
	e.normalSpeed = function(){
		e.spd = e.NormalSpd;
	}
	
	e.freezeUnfreeze = function(){
		e.freezed = !e.freezed;
	}
	
	e.updImg = function () {
            e.tickCount += 1;

            if (e.tickCount > e.ticksPerFrame) {

				e.tickCount = 0;
				
                // If the current frame index is in range
                if (e.frameIndex < e.numberOfFrames - 1) {	
					
                    // Go to the next frame
                    e.frameIndex += 1;
                } else {
                    e.frameIndex = 0;
                }
            }
        }
	
	return e;
};