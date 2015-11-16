var player = function(){
	var p = {
		lives: 20,
		money: 1000,
		optionTowerSelected: "0",
	};
	
	p.subtractingMoney = function(price){
		p.money -= price;
	}
	
	p.addingMoney = function(amount){
		p.money += amount;
	}

	p.reduceLives = function(damage){
		p.lives -= damage;
	}
	
	p.setOptionTowerSelected = function(value){
		p.optionTowerSelected = value;
	}
	
	return p;
}