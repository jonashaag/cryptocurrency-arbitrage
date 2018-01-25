module.exports = (function() {
    "use strict";

    return     {
        marketName: 'therocktrading',
        URL: 'https://api.therocktrading.com/v1/funds/tickers',
        toBTCURL: false,
        pairURL : '',
        lastPrice: function (data, coin_prices) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (var coin of data['tickers']) {

                        if(coin.fund_id.includes('BTC')) {
                            let coinName = coin.fund_id.replace('BTC','').toUpperCase();
                            let price = coin['last'];
                            if (coin.fund_id.substr(0,3) == 'BTC') {
                              price = 1/price;
                            }

                            if (!coin_prices[coinName]) coin_prices[coinName] = {};

                            coin_prices[coinName]["therocktrading"] = price;                        
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    }
})();
