# Trading Robo Monkey for Node.js using [ETrade API](https://developer.etrade.com/)

This Node app interfaces with the ETrade API to create a template necessary to implement your own intelligent automatic trading algorithms. 

**Author** 

* [Shikhir Singh](http://www.shikhir.com/)


**Why Node?**

IMHO, given the async nature and event loop architecture of Node.js, it is the best programming language for [algorithmic trading](http://en.wikipedia.org/wiki/Algorithmic_trading). Don't be surprised if it [outperforms your multithreaded C++/Java code](http://strongloop.com/strongblog/node-js-is-faster-than-java/). 

**Dependencies**

1. Node JS
2. ETrade OAuth Credentials - obtain this from ETrade by contacting them via secure message prior to install steps
3. E*Trade Brokerage Account

**How to install app**

1. Extract the app in a directory of your choice
2. Run: sudo npm install
3. Rename the config/credential-sample.json to config/credential.json
4. Edit config/credential.json and add your OAuth key and secret. You should leave callback as "oob". If your oauth is not working, first check this.



**Version**

0.0.2 - Alpha Release

**License**

[Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Usage**

1. After installing app, run it using : node app.js
2. Using your browser, goto localhost:3001/login . If your etrade oauth keys are valid, it should redirect you to etrade to verify oauth
3. Read E*Trade agreements and proceed to the last page which will give you a 5 letter oauth verifier code. 
4. Use the code by giving it to the callback function, like so: http://localhost:3001/oauth/etrade/callback?oauth_verifier=MX9ES
5. You should see an account listing if step 4 worked! Try some of the other functions - ie. http://localhost:3001/account/balance?accountId=83405188

**Known Issues**

1. The app crashes if oauth is not verified. This is not a problem as long as you get the right credentials from E*Trade
2. I don't use MS Windows so I don't know if this code works in Windows.
3. E*Trade's OAuth callback has some issues. Just leave it as "oob" in credentials.json until I hear back from E*Trade. Hopefully a fix for this is coming soon. 
4. There is some mysql references in code. It's not being used as of yet so there is no dependency on MySql. Although, it's coming in future versions.
5. If this code isn't running for you, recheck the install and usage instructions. Chances are you changed something I didn't ask you to(ie. callback)

**Future Development in progress**

* Implement other major components of ETrade REST API
* Write a sample code that buys [SPY](http://finance.yahoo.com/q?s=SPY) with excess funds if cash account balance exceeds $20k at 3:55pm EST each day.

**Why is it called Robo Trading Monkey**

To emphasize that no matter how good the software gets, it will never exceed the intellect of a monkey. Use it accordingly, as a human is not included. 

**Thanks E*Trade**

Special thanks to E*Trade for providing a [REST API](https://content.etrade.com/etrade/estation/pdf/API_Technical_Documentation.pdf). Please keep maintaining it as well as [developer.etrade.com](https://developer.etrade.com/)

**High-frequency trading**

ETrade's servers are slow. Don't expect to compete with [High-frequencing traders](http://en.wikipedia.org/wiki/High-frequency_trading) using E*Trade. Most my requests on a 30 Mbps connection are taking around half a second round trip. That's way too slow.

**Warning**

There probably are many bugs in this software. Run at your own risk(see disclaimer). I'm not responsible if you lose your money. Do not run this code if you don't understand how it works. Using algorithmic trading software is a really bad idea unless done by professionals.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE 
AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.