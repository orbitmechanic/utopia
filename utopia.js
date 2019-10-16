const GeminiAPI = require("gemini-api").default;
const secret = "3uM8TEsyq5JYufCyZSvJKfubWfzZ";
const key = "account-o00NhmV8zpSaBCq6WBDc";
const restClient = new GeminiAPI({key, secret, sandbox:true});

// Create a limit order
restClient.newOrder({amount:10,price:10,side:"buy",symbol:"ethusd"})
.then(response => console.log(response));