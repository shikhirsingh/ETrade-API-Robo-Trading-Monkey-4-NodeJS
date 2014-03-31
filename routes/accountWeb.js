var accountsModel = require('../lib/model/accounts');


exports.listAccounts = function (req, res){
	console.log(accountsModel);
	accountsModel.getAccountList(function(result){
		res.json(result);		
	});
}

exports.accountBalance = function (req, res){
	if(req.query && req.query.accountId){
		accountsModel.getAccountBalance(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);
		}, req.query.accountId);
	}
}

exports.accountPositions = function (req, res){
	if(req.query && req.query.accountId){
		accountsModel.getAccountPositions(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);		
		}, req.query.accountId);
	}
}
