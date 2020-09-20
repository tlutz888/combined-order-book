import React, { useState, useEffect } from 'react';
import {
  BittrexOrderBookType, CacheType, PoloOrderBookType, PoloOrderType,
} from '../types/objectTypes';
import { socket } from './helpers/socket';

const App = (props: AppProps) => {
  const [greeting, setGreeting] = useState<string>('');

  const [bittrexOrderBook, setBittrexOrderBook] = useState<BittrexOrderBookType>({ asks: {}, bids: {} });
  const [poloOrderBook, setPoloOrderBook] = useState<PoloOrderBookType>({ asks: {}, bids: {} });

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

    socket.on('fullOrderBook', (msg: CacheType) => {
      console.log('setting order books', msg);
      setPoloOrderBook(msg.poloBook);
      setBittrexOrderBook(msg.bittrexBook);
    });

    return () => socket.disconnect();
  });

  // useEffect(() => {
  //   console.log('using bitt effect');
  //   socket.emit('getBittrexBook', () => {});
  //   socket.on('bittrexFullBook', (msg) => {
  //     console.log('setting bittrex', msg);
  //     setBittrexOrderBook({ asks: msg.asks, bids: msg.bids });
  //   });
  //   return () => socket.disconnect();
  // });

  // useEffect(() => {
  //   console.log('using polo effect');
  //   socket.emit('getPoloBook', () => {});

  //   socket.on('poloFullBook', (msg: PoloOrderType) => {
  //     console.log('setting polo', msg);
  //     setPoloOrderBook({ asks: msg.asks, bids: msg.bids });
  //   });

  //   return () => socket.disconnect();
  // });

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <h1 className="display-1">
        Sup
        {JSON.stringify(poloOrderBook)}
        !
      </h1>
    </div>
  );
};

interface AppProps {}

export default App;
