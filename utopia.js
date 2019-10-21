global.fetch = require("node-fetch");
const GeminiAPI = require("gemini-api").default;
const secret = "3uM8TEsyq5JYufCyZSvJKfubWfzZ";
const key = "account-o00NhmV8zpSaBCq6WBDc";
const CCAPIKey = "2c24e37ce19890f3eda73ae54fbf99fd60b49ccc136c789cd3f5bfcec67f317c";
const restClient = new GeminiAPI({key, secret, sandbox:true});

const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(CCAPIKey);

// Create/cancel a limit order
restClient.newOrder({amount:10,price:10,side:"buy",symbol:"ethusd"})
.then(response => restClient.cancelOrder({order_id:response.order_id}))
.then(response => console.log(response))
.catch(error => console.log(error));


// Get list of all coins
CryptoCompareAPI.coinList()
.then(coinList => {
    console.log(coinList)
})

// Get all symbols
restClient.getAllSymbols().then(response => console.log(response));
