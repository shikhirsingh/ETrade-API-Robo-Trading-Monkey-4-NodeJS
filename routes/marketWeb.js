var marketModel = require('../lib/model/market');
var marketError = require('../lib/error/marketError');

exports.productlookup = function (req, res){
	if(req.query && req.query.company && req.query.type){
		marketModel.lookupProduct(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);
		}, req.query.company, req.query.type);
	}
	else{
		res.json({success: false, error: marketError.paramsmissing});
	}	
}

exports.getQuote = function (req, res){
	if(req.query && req.query.symbol){
		marketModel.getQuote(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);
		}, req.query.symbol, req.query.detailFlag);
	}
	else{
		res.json({success: false, error: marketError.paramsmissing});
	}	
}
