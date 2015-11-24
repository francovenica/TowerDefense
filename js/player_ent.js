var player = function(){
	var p = {
		lives: 20,
		gold: 500,
		optionTowerSelected: "0",
	};
	
	p.subtractingMoney = function(price){
		p.gold -= price;
	}
	
	p.addingMoney = function(amount){
		p.gold += amount;
	}

	p.reduceLives = function(damage){
		p.lives -= damage;
	}
	
	p.setOptionTowerSelected = function(value){
		p.optionTowerSelected = value;
	}
	
	return p;
}