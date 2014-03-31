# Trading Robo Monkey for Node.js using [E*Trade API](https://content.etrade.com/etrade/estation/pdf/API_Technical_Documentation.pdf)

This Node app interfaces with the E*Trade API to create a template necessary to implement your own intelligent automatic trading algorithms. 

**Author** 

* [Shikhir Singh](http://www.shikhir.com/)


**Why Node?**

IMHO, given the async nature and event loop architecture of Node.js, it is the best programming language for an automated trading software. Don't be surprised if it [outperforms your multithreaded C++/Java code](http://strongloop.com/strongblog/node-js-is-faster-than-java/). 

**Dependencies**

1. Node JS
2. E*Trade OAuth Credentials - obtain this from etrade prior to install steps
3. E*Trade Brokerage Account

**How to install app**

1. Extract the app
2. Run: sudo npm install
3. Rename the config/credential-sample.json to credential.json
4. Edit config/credential.json and add your OAuth key and secret. You can leave callback as "oob".



**Version**

0.0.1 - Alpha Release

**License**

[Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Usage**

1. After installing app, run it using : node app.js
2. Using your browser, goto localhost:3001/login . If your etrade oauth keys are valid, it should redirect you to etrade to verify oauth
3. Read E*Trade agreements and proceed to the last page which will give you a 5 letter oauth verifier code. 
4. Use the code by giving it to the callback function, like so: http://localhost:3001/oauth/etrade/callback?oauth_verifier=MX9ES
5. You should see an account listing if step 4 worked! Try some of the other functions - ie. http://localhost:3001/account/balance?accountId=83405188

**Known Issues**

1. The app crashes if oauth is not verified. 
2. I don't use MS Windows so I don't know if this code works in Windows.
3. OAuth callback has some issues. Just leave it as "oob" in credentials.json until I hear back from E*Trade. Hopefully a fix for this is coming soon. 
4. There is some mysql references in code. It's not being used as of yet so there is no dependency on MySql. Although, it's coming. 

**Future Development in progress**

* Implement other major components of E*Trade REST API
* Write a sample code that buys [SPY](http://finance.yahoo.com/q?s=SPY) with excess funds if cash account balance exceeds $20k at 3:55pm EST each day.

**Why is it called Robo Trading Monkey**

To emphasize that no matter how good the software gets, it will never exceed the intellect of a monkey. Use it accordingly, as a human is not included. 

**Thanks E*Trade**

Special thanks to E*Trade for providing a REST API. Please keep it that way!

**Warning**

There probably are many bugs in this software. Run at your own risk(see disclaimer). I'm not responsible if you lose your money. Do not run this code if you don't understand how it works. Using automatic traders is a really bad idea unless done by professionals.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE 
AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.