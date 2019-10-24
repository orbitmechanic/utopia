global.fetch = require("node-fetch");
const GeminiAPI = require("gemini-api").default;
const secret = "3uM8TEsyq5JYufCyZSvJKfubWfzZ";
const key = "account-o00NhmV8zpSaBCq6WBDc";

const restClient = new GeminiAPI({key, secret, sandbox:true});

const indicators = require("./indicators.js");

/* Create/cancel a limit order
restClient.newOrder({amount:10,price:10,side:"buy",symbol:"ethusd"})
.then(response => restClient.cancelOrder({order_id:response.order_id}))
.then(response => console.log(response))
.catch(error => console.log(error)); */



indicators.movingAverage('ETH','USD', 100,'hour',function(result){
    console.log('MA is: ', result)
});

