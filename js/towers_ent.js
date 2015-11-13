var tower = function (id,type, posX,posY,range, color, bulletSpeed, bulletDamage, atkSpeed, price){
	var t = {
	id: id,
	type:type,
	width:20,
	height:20,
	range: range,
	color: color,
	posX: posX,
	posY: posY,
	bulletSpeed: bulletSpeed,
	bulletDamage: bulletDamage,
	atkSpeed: atkSpeed, //milisec entre disparo y disparo
	price: price,
	lastAttack: (new Date()).getTime(),
	used: false,
	imSelected: false,
	inUse: false, 
	};
	
	t.myBullets = [];
	
	t.leftSidePos = t.posX - t.width / 2; //la coord X del lado izq
	t.rightSidePos = t.posX + t.width / 2; 
	t.topSidePos = t.posY - t.height / 2;
	t.bottomSidePos = t.posY + t.height / 2;
	
	t.usingNotUsing = function(){
		t.inUse = !t.inUse;
	}
	
	t.clickedOnMe = function(mouseX, mouseY){
		//console.log ( "left = " + t.leftSidePos + "   MouseX = " + mouseX + "  right = " + t.rightSidePos + 
		// "  top = " + t.topSidePos + "   MouseY = " + mouseY + "  bottom = " + t.bottomSidePos);
		if ( mouseX >= t.leftSidePos && mouseX <= t.rightSidePos && 
			mouseY >= t.topSidePos && mouseY <= t.bottomSidePos)
			return true;
	}
	
	t.fixCenter = function(){
		//por algun motivo no se toma bien el centro de la torre con el click del mouse, asi que lo corrijo.
		t.posX = posX - t.width/2;
		t.posY = posY - t.height/2;
	}
	
	t.drawEntity = function() { //redefino la funcion para dibujar el area de alcance
		drawEntity(t);
		ctx.beginPath();
		ctx.arc(t.posX,t.posY,t.range,0,2*Math.PI);
		ctx.stroke();
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
		X1 = arrayX[i] - t.width;
		X2 = arrayX[i+1] + t.width;
		Y1 = arrayY[i] - t.height; 
		Y2 = arrayY[i+1] + t.height;
		
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