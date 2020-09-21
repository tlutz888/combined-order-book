/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as NodeWebSocket from 'ws';
import { ControllerType, ExchangeOrderType } from '../../types/objectTypes';
import cache from '../cache';
// const NodeWebSocket = require('ws');

const poloController: ControllerType = {};

poloController.connect = (channel = 'BTC_ETH') => {
  const ws = new NodeWebSocket('wss://api2.poloniex.com');

  ws.on('open', () => {
    const subscribeMessage = { command: 'subscribe', channel };
    const unsubscribeMessage = { command: 'unsubscribe', channel };

    const request = JSON.stringify(subscribeMessage);
    const unsubRequest = JSON.stringify(unsubscribeMessage);
    ws.send(request);
    // unsubscribe after 10 seconds
    setTimeout(() => ws.send(unsubRequest), 10000);
  });

  /*
      possible responses:

      // dump of the whole order book
      [ <channel id>,
        <sequence number>,
        [
          [
            "i",
            {
              "currencyPair": "<currency pair name>",
              "orderBook": [
                {
                  "<lowest ask price>": "<lowest ask size>",
                  "<next ask price>": "<next ask size>",
                  ...
                },
                { "<highest bid price>": "<highest bid size>",
                  "<next bid price>": "<next bid size>",
                  ...
                }
              ]
            }
          ]
        ]
      ]

      individual trades
      [ <channel id>, <sequence number>,
        [
          [
            "o",
            <1 for bid 0 for ask>,
            "<price>",
            "<size>"
          ],
          [
            "o",
            <1 for bid 0 for ask>,
            "<price>",
            "<size>"
          ],
          [
            "t",
            "<trade id>",
            <1 for buy 0 for sell>,
            "<price>",
            "<size>",
            <timestamp>
          ]
        ]
        ...
      ]

      or
      [1010] - heartbeat to show we're still connected
      */
  ws.on('message', (message) => {
    const data: Array<unknown> = JSON.parse(message);

    const updates: Array<unknown> = data[2];
    if (updates) {
      updates.forEach((update) => {
        const action = update[0];

        // dump entire order book
        if (action === 'i') {
          // console.log(Object.keys(update[1]))
          const [asks, bids] = update[1].orderBook;
          Object.entries(asks).forEach(([rate, quantity]) => {
            const newOrder: ExchangeOrderType = {
              poloniex: {
                isAsk: true,
                volume: Number(quantity),
              },
            };
            if (cache[rate]) {
              cache[rate] = { ...cache[rate], ...newOrder };
            } else {
              cache[rate] = { ...newOrder };
            }
          });
          Object.entries(bids).forEach(([rate, quantity]) => {
            const newOrder: ExchangeOrderType = {
              poloniex: {
                isAsk: false,
                volume: Number(quantity),
              },
            };
            if (cache[rate]) {
              cache[rate] = { ...cache[rate], ...newOrder };
            } else {
              cache[rate] = { ...newOrder };
            }
          });
          if (action === 'o') {
            // we have an order, need to update the cache
          }
        }
      });
    }
  });
};

export default poloController;
