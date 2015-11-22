var tower = function (id,type, posX,posY,range, color, bulletSpeed, bulletDamage, atkSpeed, price){
	var t = {
	id: id,
	type:type,
	width:40,
	height:40,
	range: range,
	color: color,
	posX: posX,
	posY: posY,
	bulletSpeed: bulletSpeed,
	bulletDamage: bulletDamage,
	atkSpeed: atkSpeed, //milisec entre disparo y disparo
	price: price, //precio inicial 
	upgradePrice: price * 1.2, //precio del upgrade
	worth: price, //precio total, va a ir sumando cuanta plata se va gastando en upgrades
	level: 1, //para el nivel de upgrade
	lastAttack: (new Date()).getTime(),
	used: false, //sirve para saber si la torre se uso alguna vez (disparo o estuvo en una oleada de monstruos)
	inUse: false, //Para ver si esta en uso al momento de borrarse (capaz se esta dibujando o se esta comparando algun valor de ella y no quiero que se borre en ese momento)
	
	};
	
	t.myBullets = [];
	
	t.leftSidePos = t.posX - t.width / 2; //la coord X del lado izq
	t.rightSidePos = t.posX + t.width / 2; 
	t.topSidePos = t.posY - t.height / 2;
	t.bottomSidePos = t.posY + t.height / 2;
	
	t.tickCount = 0;
	t.ticksPerFrame = 10; //mas alto significa menos velocidad de transicion entre frames
	t.frameIndex = 0;
	t.imagen = new Image();
	
	t.setImageFramesSpritPos = function(){
		//Cada monstruo puede tener distinto ancho y alto de sprite, asi que necesita un switch para setear dichas medidas
		switch(t.type){
			case "iceTower":
				t.imagen.src = "img/iceTower.png";
				t.sprwidth = 160;
				t.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
				break;
			case "archer":
				t.imagen.src = "img/iceTower.png";
				t.sprwidth = 160;
				t.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
				break;
			case "cannon":
				t.imagen.src = "img/iceTower.png";
				t.sprwidth = 160;
				t.sprheight = 40; //quise usar imagen.width o heigth, pero parece que no funciona hasta que no arranca la ejecucion o algo asi
				break;
		}
		t.numberOfFrames = t.sprwidth / t.sprheight ;
	}
	
	t.updImg = function () {
            t.tickCount += 1;

            if (t.tickCount > t.ticksPerFrame) {

				t.tickCount = 0;
				
                // If the current frame index is in range
                if (t.frameIndex < t.numberOfFrames - 1) {	
					
                    // Go to the next frame
                    t.frameIndex += 1;
                } else {
                    t.frameIndex = 0;
                }
            }
        };
	
	t.drawSprites = function(){
		t.updImg();
		ctx.drawImage(t.imagen, //la imagen
				t.frameIndex * t.sprwidth / t.numberOfFrames, // Donde tiene que cortar en px a lo ancho [que frame] * frame ancho / numero de frames que hay
				0, // donde tiene que empezar a cortar a lo alto
				t.sprwidth / t.numberOfFrames, //ancho de la imagen total
				t.sprheight, //alto de la imagen total
				t.posX - 19, //donde lo ubica X
				t.posY - 19 , //donce lo ubica Y
				t.sprwidth / t.numberOfFrames, //cuan ancho va a dibjuar. el ancho de la imagen / numero de frames / 2 para que quede de 20x20
				t.sprheight  //cuan alto va a dibjuar. / 2 para que quede de 20x20
				);
		console.log(t.imagen.src);
	}
	
	
	t.upgrade = function(){
		t.range *= 1.10;
		t.bulletDamage *= 1.5;
		t.atkSpeed *= .9;
		t.worth += t.upgradePrice;
		t.level++;
		return true;
	}
	
	t.updateUpgradePrice = function(){
		//Tengo que aumentar la plata aca y no en upgrade() directamente porque 1ro tengo que hacer el upgrade y estar seguro que upgradeo, despues restar la plata del jugador
		//y por ultimo aumentar el precio. Si actualizo el precio 1ro al jugador le voy a restar mas plata de la debida
		t.upgradePrice = t.upgradePrice * 1.20;
	}
	
	t.usingNotUsing = function(){
		//para evitar borrar una torre que esta siendo dibujada o disparando cuando se la vende
		t.inUse = !t.inUse;
	}
	
	t.clickedOnMe = function(mouseX, mouseY){
		if ( mouseX >= t.leftSidePos && mouseX <= t.rightSidePos && 
			mouseY >= t.topSidePos && mouseY <= t.bottomSidePos)
			return true;
	}
	
	t.fixCenter = function(){
		//por algun motivo no se toma bien el centro de la torre con el click del mouse, asi que lo corrijo.
		t.posX = posX - 9;
		t.posY = posY - 9;
	}
	
	t.drawEntity = function() { //redefino la funcion para dibujar el area de alcance
		
		ctx.save();
		
		ctx.beginPath();
		ctx.arc(t.posX,t.posY,t.range,0,2*Math.PI);
		if (t.type == "iceTower")
		{	
			ctx.globalAlpha = 0.4;
			ctx.fillStyle = '#66b2ff';
			ctx.fill();
			ctx.globalAlpha = 1;
		}
		ctx.stroke();
		ctx.restore();
		//drawEntity(t);
		if(t.type != "ghostTower")
			t.drawSprites();
		ctx.fillStyle = "yellow"; //dibuja el centro del enemigo con un punto amarillo, para debug nomas
		ctx.fillRect(t.posX, t.posY, 3 , 3);
	}
	
	t.detectEnemy = function(enemy)
	{
		if (Math.pow(enemy.posX - t.posX, 2) + Math.pow(enemy.posY - t.posY, 2) <= Math.pow(t.range,2))
		{
			return true;
		}
	}
	
	t.shootBullet = function(enemy){
		t.myBullets.push(bullet(t.posX,t.posY, t.bulletSpeed, t.bulletDamage ,enemy));
	}
	
	t.checkTowerOverlap = function(){
	var possible = false;
	
	if(towers.length == 0) //si es la 1ra torre no reviso nada
		possible = true;
	else
	{
		for (var key in towers){
			if ( Math.abs(t.posX - towers[key].posX) > towers[key].width ||
				 Math.abs(t.posY - towers[key].posY) > towers[key].height)
				 {
				 possible = true; 
				 }	 
				 //Al intentar poner una torre se va a comparar que no se superponga.
				 //Se comparan las coordenadas x y con las posiciones de todas las torres, si ninguna se superpone con x e y
				 //posible se convierte en true y se va a poner la torre, sino va a ser false.
			else
			{
				possible = false;
				break; //si encuentro al menos 1 torre tengo que poner la variable en falso y salir, ya que si una torre da false en el 
					//listado, pero la que sigue da true, todavia seria un error.
			}
		}
	}
	
	return possible; 
	}
	
	t.checkRoadOverlap = function(arrayX, arrayY,roadWidth){
		var possible = true;
		var X1, X2, Y1, Y2;
		
		for (var i = 0; i < arrayX.length - 1; i++){
		X1 = arrayX[i] - t.width/1.5;
		X2 = arrayX[i+1] + t.width/1.5;
		Y1 = arrayY[i] - t.height/1.5; 
		Y2 = arrayY[i+1] + t.height/1.5;
		
		if (Y2 < Y1){ // Si el dibujado se de arriba hacia abajo me jode los calculos, por eso tengo que cambiar los nodos, para que se calcule del 
						//nodo mas arriba en la pantalla al mas abajo de la pantalla (o el de mas a la dcha con el mas a la izq)
			var aux = Y2 - 2 * t.height;
			Y2 = Y1 + 2 * t.height;
			Y1 = aux;
			}
		if (X2 < X1){
			var aux = X2 - 2 * t.width;
			X2 = X1 + 2 * t.width;
			X1 = aux;
			}
			if(t.posY > Y1 && t.posY < Y2 && t.posX >  X1 && t.posX < X2 ){
				
				possible = false;
				return possible;
				}
	
			}
		return possible;
	}
	
	t.checkOutOfBoundaries = function(){
		var possible = true;
		if (t.posX > C_WIDTH - t.width/2 || t.posX < 0 + t.width/2 || t.posY > C_HEIGHT - t.height/2 || t.posY < 0 + t.height/2)
			possible = false;
		return possible;
	}
	
	t.setUsed = function(){
		t.used = true;
	}
	
	return t;
}


var iceTower = function(id,type, posX,posY,range, color, bulletSpeed, bulletDamage, atkSpeed, price)
{
	var it = tower(id,type, posX,posY,range, color, bulletSpeed, bulletDamage, atkSpeed, price);

	it.upgrade = function(){
		it.range *= 1.20;
		it.bulletDamage -= 0.15; //para la torre de hielo el bulletDamage indica cuanto va a relentizar a los enemigos, por eso se resta	
		it.worth += it.upgradePrice;
		it.level++;
		return true;
	}
	
	return it;
}