var OAuth =  require('oauth').OAuth;
var error = require('../error/accountError');


exports.getAccountList = function(callback){
	var outputJSON = {
		success: false,
		runtime: (new Date).getTime()
	};
	
	try{
		var oa = new OAuth(	global.oauth._requestUrl,
							global.oauth._accessUrl,
							global.oauth._consumerKey,
							global.oauth._consumerSecret,
							global.oauth._version,
							global.oauth._authorize_callback,
							global.oauth._signatureMethod
						);
	}
	catch(e){
		outputJSON.error = error.oauthtimeout;
		outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;
		outputJSON.epoch = (new Date).getTime();

		callback(outputJSON);
		return false;
	}
	
	oa.getProtectedResource(
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
	
	try{
		var oa = new OAuth(	global.oauth._requestUrl,
							global.oauth._accessUrl,
							global.oauth._consumerKey,
							global.oauth._consumerSecret,
							global.oauth._version,
							global.oauth._authorize_callback,
							global.oauth._signatureMethod
						);
	}
	catch(e){
		outputJSON.error = error.oauthtimeout;
		outputJSON.epoch = (new Date).getTime();
		outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;		
		callback(outputJSON);
		return false;
	}
	
	var url = global.url.etrade[global.server].accounts.balance.replace("{accountId}",accountId);

	if(global.debug){console.log(url)};

	oa.getProtectedResource(
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
	
	try{
		var oa = new OAuth(	global.oauth._requestUrl,
							global.oauth._accessUrl,
							global.oauth._consumerKey,
							global.oauth._consumerSecret,
							global.oauth._version,
							global.oauth._authorize_callback,
							global.oauth._signatureMethod
						);
	}
	catch(e){
		outputJSON.error = error.oauthtimeout;
		outputJSON.epoch = (new Date).getTime();
		outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
		callback(outputJSON);
		return false;
	}
	// TODO: logic for optionalParams
	var url = global.url.etrade[global.server].accounts.positions.replace("{accountId}",accountId);
	
	oa._performSecureRequest(
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		"GET",
		url,
		optionalParams,
		"",
		null,
		function (error, data, response) {	
			console.log(data);
			try{
				var feed = JSON.parse(data);
				if(global.debug){console.log(data)}				
				outputJSON.positions = feed["json.accountPositionsResponse"];
				outputJSON.success=true;				
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
				callback(outputJSON);
			}
			catch(e){
				outputJSON.success=false;
				if(global.debug){
					console.log(outputJSON);									
					console.log(response);
					outputJSON.response = response;
					outputJSON.data= data;
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - outputJSON.runtime;				
				callback(outputJSON);
			}
		}
	);
}
