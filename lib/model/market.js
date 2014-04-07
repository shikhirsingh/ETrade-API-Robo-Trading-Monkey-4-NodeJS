var OAuth =  require('oauth').OAuth;
var marketError = require('../error/marketError');


exports.lookupProduct = function(callback, company, type){
	var startTime = (new Date).getTime();
	
	var outputJSON = {
		success: false
	};

    if( /[^a-zA-Z0-9]/.test(company) || /[^a-zA-Z0-9]/.test(type)) {
		outputJSON.error = marketError.badparam;
		callback(outputJSON);
		return false;		
    }	


	var url = (global.url.etrade[global.server].market.productlookup)+"?company="+encodeURIComponent(company)+"&type="+encodeURIComponent(type);
	
	if(global.debug){console.log('URL -->'+url);}

	global.oauth.get(
		url,
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			try{
				var feed = JSON.parse(data);
				if(global.debug){
					console.log(data);
				}
				if(feed.productLookupResponse && feed.productLookupResponse.productList){
					outputJSON.productList = feed.productLookupResponse.productList;
				}
				
				outputJSON.success=true;				
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - startTime;
				
				callback(outputJSON);
			}
			catch(e){
				outputJSON.success=false;
				outputJSON.error = marketError.syntaxerror;
				if(global.debug){					
					outputJSON.data= data;					
					outputJSON.company = company;	
					console.log(outputJSON);
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - startTime;				
				callback(outputJSON);
			}
		}
	);
}


exports.getQuote = function(callback, symbol, detailFlag){
	var startTime = (new Date).getTime();
	
	var outputJSON = {
		success: false
	};

    if( /[^a-zA-Z0-9]/.test(symbol)) {
		outputJSON.error = marketError.badparam;
		callback(outputJSON);
		return false;		
    }
    if(detailFlag && (/[^a-zA-Z0-9]/.test(detailFlag))) {
		outputJSON.error = marketError.badparam;
		callback(outputJSON);
		return false;		
    }	    

	var url = (global.url.etrade[global.server].market.getQuote.replace("{symbol}",symbol));

	if(detailFlag){
	
		url+="?detailFlag="+encodeURIComponent(detailFlag);
	}
	
	if(global.debug){console.log('URL -->'+url);}

	global.oauth.get(
		url,
		global.oauth.oauth_access_token,
		global.oauth.oauth_access_token_secret,
		function (error, data, response) {	
			try{
				var feed = JSON.parse(data);
				if(global.debug){
					console.log(data);
				}
				if(feed.quoteResponse && feed.quoteResponse.quoteData){
					outputJSON.quotes = feed.quoteResponse.quoteData;
				}
				
				outputJSON.success=true;				
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - startTime;
				
				callback(outputJSON);
			}
			catch(e){
				outputJSON.success=false;
				outputJSON.error = marketError.syntaxerror;
				if(global.debug){					
					outputJSON.data= data;					
					outputJSON.company = company;	
					console.log(outputJSON);
				};								
				outputJSON.epoch = (new Date).getTime();
				outputJSON.runtime = (new Date).getTime() - startTime;				
				callback(outputJSON);
			}
		}
	);
}
