const GeminiAPI = require("gemini-api").default;
const secret = "3uM8TEsyq5JYufCyZSvJKfubWfzZ";
const key = "account-o00NhmV8zpSaBCq6WBDc";
const restClient = new GeminiAPI({key, secret, sandbox:true});

// Get all symbols
restClient.getAllSymbols().then(response => console.log(response));