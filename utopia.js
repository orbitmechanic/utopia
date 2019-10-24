global.fetch = require("node-fetch");
const GeminiAPI = require("gemini-api").default;
const secret = "3uM8TEsyq5JYufCyZSvJKfubWfzZ";
const key = "account-o00NhmV8zpSaBCq6WBDc";

const restClient = new GeminiAPI({key, secret, sandbox:true});

const indicators = require("./indicators.js");

indicators.movingAverage('ETH','USD', 100,'hour',function(result){
    console.log('MA is: ', result)
});