
import cache from '../cache'

type PoloUpdate = [

]

type PoloResponseType = [
  Number,
  Number?,
  PoloUpdate?
]
const NodeWebSocket = require("ws");

const poloController: any = {};

poloController.connect = (channel = "BTC_ETH") => {
  const ws = new NodeWebSocket("wss://api2.poloniex.com");

  ws.on("open", () => {
    // const channel = "BTC_ETH";
    const subscribeMessage = { command: "subscribe", channel };

    const request = JSON.stringify(subscribeMessage);
    console.log("opened", { request });
    ws.send(request);

    // .catch(err => console.log(err))
    // .then(res => console.log('hi'))
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
  ws.on("message", (message) => {
    const data: Array<any> = JSON.parse(message);

    const updates: Array<any> | undefined = data[2]
    if (updates){
      updates.forEach((update) => {
        const action = update[0];

        // dump entire order book
        if (action === 'i') {
          // console.log(Object.keys(update[1]))
          const [asks, bids] = update[1].orderBook;
          cache.poloBook = { asks, bids }
          console.log(Object.keys(asks).length)
        }
        if (action === 'o') {
          // we have an order, need to update the cache
        }

      })
    }
  });

}

export default poloController;