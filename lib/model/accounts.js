var OAuth =  require('oauth').OAuth;
var accountError = require('../error/accountError');


function countProperties(obj) {
    return Object.keys(obj).length;
}



exports.getAccountList = function(callback){
	var outputJSON = {
		success: false,
		runtime: (new Date).getTime()
	};

	global.oauth.getProtectedResource(
		global.url.etrade[global.server].accounts.list,
		"GET",
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			console.log(data);
			try{
				var feed = JSON.parse(data);
				outputJSON.list = feed["json.accountListResponse"].response;
				outputJSON.success=true;
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;					
				callback(outputJSON);
				return;
			}
			catch(e){
				outputJSON.success=false;
				if(global.debug){
					console.log(outputJSON);									
					console.log(response);
					outputJSON.response = response;					
				};
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;						
				callback(outputJSON);
				return;
			}
		}
	);
}

exports.getAccountBalance = function(callback, accountId){
	if(global.debug){ console.log("Getting Account Balance")};

	var outputJSON = {
		success: false,
		runtime: (new Date).getTime()
	};

	var url = global.url.etrade[global.server].accounts.balance.replace("{accountId}",accountId);

	global.oauth.getProtectedResource(
		url,
		"GET",
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			try{
				var feed = JSON.parse(data);
				if(global.debug){console.log(data)}
				outputJSON.balance = feed["json.accountBalanceResponse"];
				outputJSON.success=true;
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
				callback(outputJSON);
				return;

			}
			catch(e){
				outputJSON.success=false;
				
				if(global.debug){
					console.log(outputJSON);									
					console.log(data);
					console.log(response);
					outputJSON.response = response;			
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;
				callback(outputJSON);
				return;
			}
		}
	);
}

exports.getAccountPositions = function(callback, accountId, optionalParams){
	var outputJSON = {
		success: false,
		runtime: (new Date).getTime()
	};

    if( /[^a-zA-Z0-9]/.test(accountId) ) {
		outputJSON.error = accountError.badparam;
		outputJSON.error.badparam = "accountId";
		callback(outputJSON);
		return false;		
    }	
	
	var url = (global.url.etrade[global.server].accounts.positions.replace("{accountId}",accountId));
	
	if(optionalParams){
		var urlExtra="?";
		var i=0;
    	for( var key in optionalParams ) {
		    if( /[^a-zA-Z0-9]/.test(key) ) {
				outputJSON.error = accountError.badparam;
				outputJSON.error.badparam = key;
				callback(outputJSON);
				return false;		
		    }	
    	
    		if(i!=0){urlExtra+="&"};
    		urlExtra += encodeURIComponent(key)+"="+encodeURIComponent(optionalParams[key]);
    		i++;
		}
		console.log("urlExtra ->"+urlExtra);
		url+=urlExtra;
		if(global.debug){
			console.log("URL --->"+url);		
		};
	}

	
	global.oauth.get(
		url,
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			try{
				var feed = JSON.parse(data);
				if(global.debug){
					console.log(data);
					console.log(optionalParams);
				}				
				outputJSON.positions = feed["json.accountPositionsResponse"];
				outputJSON.success=true;				
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;
				
				callback(outputJSON);
			}
			catch(e){
				outputJSON.optionalParams = optionalParams;
				outputJSON.success=false;
				outputJSON.error = accountError.syntaxerror;
				if(global.debug){					
					outputJSON.data= data;					
					outputJSON.accountId = accountId;	
					console.log(outputJSON);
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
				callback(outputJSON);
			}
		}
	);
}

exports.getTransactionsHistory = function(callback, accountId, optionalParams){
	var outputJSON = {
		success: false,
		runtime: (new Date).getTime()
	};

    if( /[^a-zA-Z0-9]/.test(accountId) ) {
		outputJSON.error = accountError.badparam;
		outputJSON.error.badparam = "accountId";
		callback(outputJSON);
		return false;		
    }	
	
	var url = (global.url.etrade[global.server].accounts.transactionhistory.replace("{accountId}",accountId));
	
	if(optionalParams){
		var urlExtra="?";
		var i=0;
    	for( var key in optionalParams ) {
		    if( /[^a-zA-Z0-9]/.test(key) ) {
				outputJSON.error = accountError.badparam;
				outputJSON.error.badparam = key;
				callback(outputJSON);
				return false;		
		    }	
    	
    		if(i!=0){urlExtra+="&"};
    		urlExtra += encodeURIComponent(key)+"="+encodeURIComponent(optionalParams[key]);
    		i++;
		}
		url+=urlExtra;
		if(global.debug){
			console.log("URL --->"+url);		
		};		
	}


	global.oauth.get(
		url,
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			try{
				var feed = JSON.parse(data);
				if(global.debug){
					console.log(data);
					if(optionalParams){console.log(optionalParams)};
				}				
				outputJSON.positions = feed["json.transactions"];
				outputJSON.success=true;				
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;
				
				callback(outputJSON);
			}
			catch(e){
				outputJSON.optionalParams = optionalParams;
				outputJSON.success=false;
				outputJSON.error = accountError.syntaxerror;
				if(global.debug){					
					outputJSON.data= data;					
					outputJSON.accountId = accountId;	
					console.log(outputJSON);
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
				callback(outputJSON);
			}
		}
	);

}

exports.getTransactionsDetails = function(callback, accountId, transactionId, optionalParams){
	var outputJSON = {
		success: false,
		runtime: (new Date).getTime()
	};

    if( /[^a-zA-Z0-9]/.test(accountId) ) {
		outputJSON.error = accountError.badparam;
		outputJSON.error.badparam = "accountId";
		callback(outputJSON);
		return false;		
    }	
	
	var url = (global.url.etrade[global.server].accounts.transactiondetails.replace("{accountId}",accountId).replace("{transactionId}",transactionId));
	
	console.log("old URL -->"+url);
	if(optionalParams){
		var urlExtra="?";
		var i=0;
    	for( var key in optionalParams ) {
		    if( /[^a-zA-Z0-9]/.test(key) ) {
				outputJSON.error = accountError.badparam;
				outputJSON.error.badparam = key;
				callback(outputJSON);
				return false;
		    }	
    	
    		if(i!=0){urlExtra+="&"};
    		urlExtra += encodeURIComponent(key)+"="+encodeURIComponent(optionalParams[key]);
    		i++;
		}
		console.log("urlExtra ->"+urlExtra);
		url+=urlExtra;
		if(global.debug){
			console.log("URL --->"+url);		
		};
	}

	global.oauth.get(
		url,
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			try{
				var feed = JSON.parse(data);
				if(global.debug){
					console.log(data);
					if(optionalParams){console.log(optionalParams)};
				}				
				outputJSON.positions = feed["json.transactionDetails"];
				outputJSON.success=true;				
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;
				
				callback(outputJSON);
			}
			catch(e){
				outputJSON.optionalParams = optionalParams;
				outputJSON.success=false;
				outputJSON.error = accountError.syntaxerror;
				if(global.debug){					
					outputJSON.data= data;					
					outputJSON.accountId = accountId;	
					console.log(outputJSON);
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
				callback(outputJSON);
			}
		}
	);


}