var OAuth =  require('oauth').OAuth;
var request = require('request');

exports.login = function (req, res){
	console.log("Login");
	var outputJSON = {
		success: true,
		credential: global.credential
	}
	

	var oa = new OAuth(global.url.etrade.oauth.token.requesttoken,
	                   global.url.etrade.oauth.token.accesstoken,
	                   global.credential.etrade.oauth.consumer_key,
	                   global.credential.etrade.oauth.consumer_secret,
	                   "1.0",
	                   global.credential.etrade.oauth.callback,
	                   "HMAC-SHA1");

	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
	  if(error) {
			console.log('error');
	 		console.log(error);
		}
	  else { 
			
			req.session.oa = oa;
			req.session.oauth_token = oauth_token;
			req.session.oauth_token_secret = oauth_token_secret;
			
			console.log("OAuth Token  -->"+oauth_token);
			console.log("OAuth Secret -->"+oauth_token_secret);
			
			console.log(results);
			
			// redirect the user to authorize the token
			outputJSON.oauth_token = oauth_token;
			outputJSON.oauth_token_secret = oauth_token_secret;
			res.redirect(global.url.etrade.oauth.token.authorize+"?key="+encodeURIComponent(global.credential.etrade.oauth.consumer_key)+"&token="+encodeURIComponent(oauth_token));		
	  }
	})
	//res.json(outputJSON);						
}

exports.etradeCallback = function (req, res){
	var oa = new OAuth(	req.session.oa._requestUrl,
						req.session.oa._accessUrl,
						req.session.oa._consumerKey,
						req.session.oa._consumerSecret,
						req.session.oa._version,
						req.session.oa._authorize_callback,
						req.session.oa._signatureMethod);

    console.log(oa);

	oa.getOAuthAccessToken(
	req.session.oauth_token,
	req.session.oauth_token_secret,
	req.param('oauth_verifier'),
	function(error, oauth_access_token, oauth_access_token_secret, results2) {
		if(error) {
			console.log('error');
			console.log(error);
		}
		else {
		
			// store the access token in the session
			req.session.oauth_access_token = oauth_access_token;
			req.session.oauth_access_token_secret = oauth_access_token_secret;
			
			global.oauth=req.session.oa;
			global.oauth.oauth_access_token = oauth_access_token;
			global.oauth.oauth_access_token_secret = oauth_access_token_secret;
			
			res.redirect("/accounts/listAccounts");
		}

	});
}


exports.listAccounts = function (req, res){
	var oa = new OAuth(	req.session.oa._requestUrl,
						req.session.oa._accessUrl,
						req.session.oa._consumerKey,
						req.session.oa._consumerSecret,
						req.session.oa._version,
						req.session.oa._authorize_callback,
						req.session.oa._signatureMethod
					);
	
	oa.getProtectedResource(
		global.url.etrade[global.server].accounts.list,
		"GET",
		req.session.oauth_access_token,
		req.session.oauth_access_token_secret,
		function (error, data, response) {	
			console.log(data);
			var feed = JSON.parse(data);
			res.json(feed);
		}
	);

}
