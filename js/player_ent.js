var player = function(){
	var p = {
		lives: 20,
		money: 1000,
		optionTowerSelected: "0",
	};
	
	p.buyingTower = function(price){
		p.money -= price;
	}
	
	p.gettingMoneyFromEnemy = function(amount){
		p.money += amount;
	}
	
	p.sellingTower = function (amount){
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