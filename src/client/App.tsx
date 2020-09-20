import React, { useState, useEffect } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row, Navbar,, Container, ProgressBar
} from 'react-bootstrap';
import {
  BittrexOrderBookType, CacheType, PoloOrderBookType, PoloOrderType, PriceOrderType, RoundedOrderBookType,
} from '../types/objectTypes';
import PriceRow from './components/PriceRow';
import { socket } from './helpers/socket';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props: AppProps) => {
  const [decimals, setDecimals] = useState(3);

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
    socket.emit('getFullBook', () => { });

    socket.on('fullOrderBook', (msg: PriceOrderType) => {
      console.log('setting order books', msg);
      setOrderBook(msg);
      // setPoloOrderBook(msg.poloBook);
      // setBittrexOrderBook(msg.bittrexBook);
    });

    return () => socket.disconnect();
  }, []);

  // max volume to scale the size bars
  let maxVolume = 0;
  // round order book to correct decimal place
  const roundedOrderBook = Object.entries(orderBook).reduce(
    (acc: RoundedOrderBookType, [price, entry]) => {
      // console.log('*******',Object.entries(entry)[0][1].volume)
      maxVolume = Math.max(maxVolume, Object.entries(entry)[0][1].volume);
      const roundedPrice: string = Number(price).toFixed(decimals);
      if (!acc[roundedPrice]) acc[roundedPrice] = [entry];
      else acc[roundedPrice] = [...acc[roundedPrice], entry];

      // console.log(maxVolume)
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
    <div>
      <Row>
      <Navbar fixed="top" className="nav">

        <Col>
        <ProgressBar variant="success" now={100} label={'Poloniex'} key={'polobar'} />
          <h2>ASKS:</h2>

        </Col>
        <Col>
          <input
            value={decimals}
            onChange={(e) => setDecimals(parseInt(e.target.value))}
            />
            <h3>PRICE:</h3>
        </Col>
        <Col>
        <ProgressBar variant="danger" now={100} label={'Bittrex'} key={'bittbar'} />

          <h2>BIDS:</h2>

        </Col>

      </Navbar>
        </Row>
      <ListGroup>

        {
          Object.entries(roundedOrderBook)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([price, entries]) => (
            <ListGroupItem key={`groupItem ${price}`}>

                <PriceRow
                  key={price}
                  {...{ price, entries, maxVolume }}
                  />

              </ListGroupItem>
            ))
            
        }
      </ListGroup>
    </div>
  );
};

interface AppProps { }

export default App;
