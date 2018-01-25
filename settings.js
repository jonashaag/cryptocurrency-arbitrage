//
// let boilerPlateMarket =
// {
//     marketName: '',
//     URL: '', //URL To Fetch API From.
//     toBTCURL: false, //URL, if needed for an external bitcoin price api.
//     last: function (data, coin_prices) { //Get the last price of coins in JSON data
//         return new Promise(function (res, rej) {
//             try {
//                 for (x in / of data) {
//                     price = ...;
//                     coin_prices[coinName][marketName] = price;
//                 }
//                 res(coin_prices);
//             }
//             catch (err) {
//                 rej(err);
//             }
//
//         })
//     },
//
//
// }

let markets = [
    require('./exchanges/bittrex'),
    // require('./exchanges/btc38'),
    //    require('./exchanges/jubi'),
    require('./exchanges/poloniex'),
    require('./exchanges/cryptopia'),
    require('./exchanges/bleutrade'),
    require('./exchanges/kraken'),
    require('./exchanges/bitfinex'),
    require('./exchanges/therocktrading'),

	{
        marketName: 'binance',
        URL: 'https://api.binance.com/api/v1/ticker/allPrices',
        toBTCURL: false,
        pairURL : '',
        blacklist : ['<CoinName>'],
        lastPrice: function (data, coin_prices) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
					//console.log("hi this is the result2:\n" + JSON.stringify(data[0], null, 2));
                    for (let obj of data) {
						//console.log("current coin:\n" + JSON.stringify(obj, null, 2));
                        if(obj["symbol"].includes('BTC')) {
                            let coinName = obj["symbol"].replace("BTC", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].binance = obj["price"];
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
    },
	{
        marketName: 'bitgrail',
        URL: 'https://bitgrail.com/api/v1/markets',
        toBTCURL: false,
        pairURL : '',
        lastPrice: function (data, coin_prices) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
					//console.log("hi this is the result2:\n" + JSON.stringify(data[0], null, 2));
                    for (let obj of data['response']['BTC']) {
                        if(obj["market"].includes('/BTC')) {
                            let coinName = obj["market"].replace("/BTC", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].bitgrail = obj["last"];
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

    },
	
	{
        marketName: 'kucoin',
        URL: 'https://api.kucoin.com/v1/market/open/symbols',
        toBTCURL: false,
        pairURL : '',
        lastPrice: function (data, coin_prices) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
					//console.log("hi this is the result2:\n" + JSON.stringify(data[0], null, 2));
                    for (let obj of data['data']) {
                        if(obj["symbol"].includes('-BTC')) {
                            let coinName = obj["symbol"].replace("-BTC", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].kucoin = obj["lastDealPrice"];
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
];
let blacklist=['LSK', 'BTG', 'CFT', 'BITB', 'GBYTE', 'MUSIC', 'PINK', 'FUEL', 'CMT', 'BCD']
let marketNames = [];
for(let i = 0; i < markets.length; i++) { // Loop except cryptowatch
    marketNames.push([[markets[i].marketName], [markets[i].pairURL]]);
}
console.log("Markets:", marketNames);
module.exports = function () {
    this.markets = markets;
    this.marketNames = marketNames;
};
