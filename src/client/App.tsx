import React, { useState, useEffect } from 'react';
import {
  BittrexOrderBookType, CacheType, PoloOrderBookType, PoloOrderType, PriceOrderType, RoundedOrderBookType,
} from '../types/objectTypes';
import PriceRow from './components/PriceRow';
import { socket } from './helpers/socket';

const App = (props: AppProps) => {
  const [decimals, setDecimals] = useState(4);

  // const [bittrexOrderBook, setBittrexOrderBook] = useState<BittrexOrderBookType>({ asks: {}, bids: {} });
  // const [poloOrderBook, setPoloOrderBook] = useState<PoloOrderBookType>({ asks: {}, bids: {} });
  const [orderBook, setOrderBook] = useState<PriceOrderType>({});
  // useEffect(() => {
  // //   // (async () => {
  // //   // 	try {
  // //   console.log('socket: ', socket, socket.connected);
  //   socket.emit('getInitialState', (msg) => console.log(msg));
  // 	socket.on('response', (msg) => console.log(msg));
  // 	socket.on('poloFullBook', (msg) => {
  // 		console.log('this one')
  // 		console.log('setting state', msg)
  //     // setPoloOrderBook({ asks: msg.asks });
  //   });

  // //   socket.on('poloUpdate', (msg) => console.log('poloUpdate:', msg));
  // //   socket.on('bittrexUpdate', (msg) => console.log('bittrexUpdate:', msg));
  // //   socket.on('full order book', (msg) => console.log('full order book:', msg));

  // //   // const res = await fetch('/api/sup');
  // //   // const greeting = await res.json();
  // //   // setGreeting(greeting);
  // //   // } catch (error) {
  // //   // console.log(error);
  // //   // })();
  // });
  useEffect(() => {
    console.log('fetching all useeffect');
    socket.emit('getFullBook', () => {});

    socket.on('fullOrderBook', (msg: PriceOrderType) => {
      console.log('setting order books', msg);
      setOrderBook(msg);
      // setPoloOrderBook(msg.poloBook);
      // setBittrexOrderBook(msg.bittrexBook);
    });

    return () => socket.disconnect();
  }, []);

  // round order book to correct decimal place
  const roundedOrderBook = Object.entries(orderBook).reduce(
    (acc: RoundedOrderBookType, [price, entry]) => {
    // console.log(entry)
      const roundedPrice: number = Number(price).toFixed(decimals);
      if (!acc[roundedPrice]) acc[roundedPrice] = [entry];
      else acc[roundedPrice] = [...acc[roundedPrice], entry];

      return acc;
    // else if (acc[roundedPrice][])
    // const rounded = Number(entry[0]).toFixed(decimals)
    // console.log(rounded)
    }, {},
  );
  // console.log('rounded orders:', Object.keys(roundedOrderBook));
  // console.log(Object.entries(roundedOrderBook)
  //   .sort((a, b) => Number(a[0]) - Number(b[0]))
  //   .slice(0, 100));

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div>
        <input
          value={decimals}
          onChange={(e) => setDecimals(parseInt(e.target.value))}
        />

        {
        Object.entries(roundedOrderBook)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([price, entries]) => (
            <PriceRow
              key={price}
              {...{ price, entries }}
            />
          ))

        }
        {/* {Object.entries(orderBook.bids)
          .sort((a, b) => a[0] - b[0])
          .map(([price, volume]) => (
            <PriceRow
              {...{ price, volume }}
              isAsk={false}
            />
        ))}
        {Object.entries(orderBook.asks)
          .sort((a, b) => a[0] - b[0])
          .map(([price, volume]) => (
            <PriceRow
              {...{ price, volume }}
              isAsk={true}
            />
        ))} */}
      </div>
    </div>
  );
};

interface AppProps {}

export default App;
