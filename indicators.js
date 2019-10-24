const CryptoCompareAPI = require("cryptocompare");
const CCAPIKey = "2c24e37ce19890f3eda73ae54fbf99fd60b49ccc136c789cd3f5bfcec67f317c";
CryptoCompareAPI.setApiKey(CCAPIKey);

module.exports = {
    movingAverage:function (asset,denomination,periods,scale,callback){
        // Create an MA indicator as follows:
        
        if (periods > 169) {
            console.error('Only 169 periods are allowed');
            return;
        }
        
        // (pick a scale)
        switch(scale){
            case 'day':
                fetchWith = CryptoCompareAPI.histoDay;
                break;
            case 'hour':
                fetchWith = CryptoCompareAPI.histoHour;
                break;
            case 'minute':
                fetchWith = CryptoCompareAPI.histoMinute;
            default:
                console.log('Invalid scale');
                return;
        }
        
        // 1.) Get data from CryptoCompare
        fetchWith(asset, denomination,{'limit':periods})
        .then(data => {
            // 2.) Calculate MA100 from data
            var sum = 0;
            for (var i = 0; i < periods; i++){
                sum += data[i].close;
            } 
            var MA = sum/periods;
            callback(MA);
        })
        .catch(console.error)
        }
}


