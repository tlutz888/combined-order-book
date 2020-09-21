/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as SignalRClient from 'bittrex-signalr-client';
import { BittrexResponseType, ControllerType, ExchangeOrderType } from '../../types/objectTypes';
import cache from '../cache';

const bittrexController: ControllerType = {};

bittrexController.connect = (channel = 'BTC-ETH') => {
  const client = new SignalRClient({
    // websocket will be automatically reconnected if server does not respond to ping after 10s
    pingTimeout: 10000,
    watchdog: {
      // automatically reconnect if we don't receive markets data for 30 sec
      markets: {
        timeout: 10000,
        reconnect: true,
      },
    },
    // use cloud scraper to bypass Cloud Fare (default)
    useCloudScraper: true,
  });

  // -- event handlers
  client.on('orderBook', (data) => {
    // set bids in the cache
    data.data.buy.forEach(({ rate, quantity }: BittrexResponseType) => {
      const newOrder: ExchangeOrderType = {
        bittrex: {
          isAsk: false,
          volume: quantity,
        },
      };
      if (cache[rate]) {
        cache[rate] = { ...cache[rate], ...newOrder };
      } else {
        cache[rate] = { ...newOrder };
      }
      // cache.bittrexBook.bids[rate] = quantity;
    });
    // set asks in the cache
    data.data.sell.forEach(({ rate, quantity }: BittrexResponseType) => {
      const newOrder: ExchangeOrderType = {
        bittrex: {
          isAsk: true,
          volume: quantity,
        },
      };
      if (cache[rate]) {
        cache[rate] = { ...cache[rate], ...newOrder };
      } else {
        cache[rate] = { ...newOrder };
      }
    });
    client.on('orderBookUpdate', (data: any) => {
      data.data.buy.forEach(({ action, rate, quantity }) => {
        const newOrder: ExchangeOrderType = {
          bittrex: {
            isAsk: false,
            volume: quantity,
          },
        };
          // if it is an update, update the quantity in cache
        cache[rate] = { ...cache[rate], ...newOrder };
      });
    });
    client.on('trades', (data) => {
      // console.log(util.format("Got trades for pair '%s'", data.pair));
    });
  });

  // -- start subscription
  // eslint-disable-next-line no-console
  console.log(`=== Subscribing to '${channel}' pair`);
  client.subscribeToMarkets([channel]);

  // unsubscribe after 10 sec after cache has been updated
  setTimeout(() => client.unsubscribeFromOrders(), 10000);
};

export default bittrexController;
