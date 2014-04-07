var accountsModel = require('../lib/model/accounts');
var accountError = require('../lib/error/accountError');

function countProperties(obj) {
    return Object.keys(obj).length;
}


exports.listAccounts = function (req, res){
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
	else{
		res.json({success: false, error: accountError.paramsmissing});
	}	
}

exports.accountPositions = function (req, res){
	if(req.query && req.query.accountId){
		var accountId = req.query.accountId;
		if(countProperties(req.query) > 1){
			var optionalParams=req.query;
			delete optionalParams.accountId;		
		}
		else{
			var optionalParams = null;
		}
		
		accountsModel.getAccountPositions(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);		
		}, 
		accountId,
		optionalParams);
	}
	else{
		res.json({success: false, error: accountError.paramsmissing});
	}
}

exports.transactionsHistory = function (req, res){
	if(req.query && req.query.accountId){
		var accountId = req.query.accountId;
		if(countProperties(req.query) > 1){
			var optionalParams=req.query;
			delete optionalParams.accountId;		
		}
		else{
			var optionalParams = null;
		}
		
		accountsModel.getTransactionsHistory(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);		
		}, 
		accountId,
		optionalParams);
	}
	else{
		res.json({success: false, error: accountError.paramsmissing});
	}
}

exports.transactionsDetails = function (req, res){
	if(req.query && req.query.accountId && req.query.transactionId){
		var accountId = req.query.accountId;
		var transactionId = req.query.transactionId;
		
		if(countProperties(req.query) > 2){
			var optionalParams=req.query;
			delete optionalParams.accountId;
			delete optionalParams.transactionId;					
		}
		else{
			var optionalParams = null;
		}
		
		accountsModel.getTransactionsDetails(function(result){
			if(global.debug) {result.query = req.query;}
			res.json(result);		
		}, 
		accountId,
		transactionId,
		optionalParams);
	}
	else{
		res.json({success: false, error: accountError.paramsmissing});
	}
}
