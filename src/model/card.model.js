let db = require("../database/db.js");

//-----------------------------------------------------------------------------

function Card() {
    this.db = db;
}

//-----------------------------------------------------------------------------

Card.prototype.registerCard = function(card) {
	return this.db.exec("INSERT INTO cards (network_type , number , expiry_date , CVV , PIN) VALUES (?,?,?,?,?)" ,
				  [card.network_type , card.number , card.expiry_date , card.CVV , card.PIN]
	).then(() => {
		return card.number;
	});
}

module.exports = Card;