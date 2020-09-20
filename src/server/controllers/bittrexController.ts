import cache from '../cache';

const util = require('util');
const SignalRClient = require('bittrex-signalr-client');

const bittrexController: any = {};

bittrexController.connect = (channel = 'BTC-ETH') => {
  console.log(SignalRClient);

  const client = new SignalRClient({
    // websocket will be automatically reconnected if server does not respond to ping after 10s
    pingTimeout: 10000,
    watchdog: {
      // automatically reconnect if we don't receive markets data for 30min (this is the default)
      markets: {
        timeout: 1800000,
        reconnect: true,
      },
    },
    // use cloud scraper to bypass Cloud Fare (default)
    useCloudScraper: true,
  });

  // -- event handlers
  client.on('orderBook', (data) => {
    console.log({ data });
    console.log(data.data.buy.slice(0, 10));
    const sliced = data.data.buy.slice(0, 10);

    // set bids in the cache
    data.data.buy.forEach(({ rate, quantity }) => {
      cache.bittrexBook.bids[rate] = quantity;
    });
    // set asks in the cache
    data.data.sell.forEach(({ rate, quantity }) => {
      cache.bittrexBook.asks[rate] = quantity;
    });

    // console.log(cache.BittrexBook)
    // console.log(cache)
    // cache.BittrexBook.bids
    console.log(
      util.format(
        "Got full order book for pair '%s' : cseq = %d",
        data.pair,
        data.cseq,
      ),
    );
  });
  // client.on('orderBookUpdate', function(data){
  //   console.log(util.format("Got order book update for pair '%s' : cseq = %d", data.pair, data.cseq));
  // });
  // client.on('trades', function(data){
  //   console.log(util.format("Got trades for pair '%s'", data.pair));
  // });

  // -- start subscription
  console.log("=== Subscribing to 'USDT-BTC' pair");
  client.subscribeToMarkets([channel]);
};

export default bittrexController;
