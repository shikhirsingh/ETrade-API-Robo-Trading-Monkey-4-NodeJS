/**
 * Module dependencies.
 */

var credential = require('./config/credential')
	, siteUrl = require('./config/url')
	, express = require('express')
	, app = express()
	, path = require('path')
	, http = require('http')
	, accountWeb = require('./routes/accountWeb')
	, marketWeb =  require('./routes/marketWeb')
	, login = require('./routes/login');

GLOBAL.debug = true;
GLOBAL.credential = credential;
GLOBAL.url = siteUrl;
GLOBAL.server = "sandbox"; // VALID values are "sandbox" or "prod"

var randomLetters = (Math.random() + 1).toString(36).substring(2,30); // generates random letters necessary for session and cookies

app.enable("jsonp callback"); // doesn't seem to work

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon("views/favicon.ico"));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('RandomStuffGoesHere'+randomLetters)); // parameter contains a random value  
  app.use(express.session({secret: 'MoreRandomStuff'+randomLetters}));
  app.use(express.methodOverride());
  /*
  app.use(express.session({ secret: 'supersecretkeygoeshere', 
  							store: new MySQLSessionStore(mysql.database, 
  														mysql.user, 
  														mysql.password, 
  														{
  															host: mysql.host}
  														)}
  						));
  */
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});




app.all('/login', login.login);
app.all('/oauth/etrade/callback', login.etradeCallback);
app.all('/accounts/listAccounts', accountWeb.listAccounts);
app.all('/account/balance', accountWeb.accountBalance);
app.all('/account/positions', accountWeb.accountPositions);
app.all('/account/transactions/history', accountWeb.transactionsHistory);
app.all('/account/transactions/details', accountWeb.transactionsDetails);

app.all('/market/productlookup', marketWeb.productlookup);
app.all('/market/quote', marketWeb.getQuote);


http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
