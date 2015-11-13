var ghostTower = function(posX,posY){
	var gt = tower(posX,posY);
	gt.id = "ghostTower";
	gt.color = "grey";
	
	gt.drawEntity();
	
	gt.updatePos = function(x,y){
		gt.posX = x;
		gt.posY = y;
	}
	
	gt.range; 
	
	gt.setRange = function(range){
		gt.range = range;
	}

	return gt;
}