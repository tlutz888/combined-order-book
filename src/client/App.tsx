import React, { useState, useEffect } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row, Navbar, ProgressBar, Dropdown,
} from 'react-bootstrap';
import { PriceOrderType, RoundedOrderBookType } from '../types/objectTypes';
import PriceRow from './components/PriceRow';
import { socket } from './helpers/socket';
// import 'bootstrap/dist/css/bootstrap.min.css';

import * as markets from './helpers/markets';

const App: React.FC = () => {
  const [decimals, setDecimals] = useState(3);

  const [orderBook, setOrderBook] = useState<PriceOrderType>({});
  const [market, setMarket] = useState(markets.BTC_ETH);

  useEffect(() => {
    socket.emit('getFullBook', market);

    socket.on('fullOrderBook', (msg: PriceOrderType) => {
      setOrderBook(msg);
      // setPoloOrderBook(msg.poloBook);
      // setBittrexOrderBook(msg.bittrexBook);
    });

    /*
    I had trouble parsing the websocket updates so I just reset the websocket request instead
    It's not ideal, but it's updating every second
    */

    const interval = setInterval((() => {
      socket.emit('getFullBook', market);
    }), 2000);
    // socket.on('update', (rate: number, order: PriceOrderType) => {
    // });

    // disconnect socket  and clear interval when component unmounts
    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [market]);

  // round order book to correct decimal place
  const roundedOrderBook = Object.entries(orderBook).reduce(
    (acc: RoundedOrderBookType, [price, entry]) => {
      const roundedPrice: string = Number(price).toFixed(decimals);
      if (!acc[roundedPrice]) acc[roundedPrice] = [entry];
      else acc[roundedPrice] = [...acc[roundedPrice], entry];

      return acc;
    }, {},
  );
  return (
    <div>
      <Row>
        <Navbar fixed="top" className="nav">

          <Col>
            <ProgressBar variant="success" now={100} label="Poloniex" key="polobar" />
            <h2>ASKS:</h2>

          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Market
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(markets).map((mkt) => (
                  <Dropdown.Item key={`dd-${mkt}`} onClick={() => setMarket(markets[mkt])}>{mkt}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Round to Decimals:
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <Dropdown.Item key={`dd-${num}`} onClick={() => setDecimals(num)}>{num}</Dropdown.Item>

                ))}
              </Dropdown.Menu>
            </Dropdown>
            <h3>PRICE:</h3>
          </Col>
          <Col>
            <ProgressBar variant="danger" now={100} label="Bittrex" key="bittbar" />

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
                  {...{ price, entries }}
                />

              </ListGroupItem>
            ))

        }
      </ListGroup>
    </div>
  );
};

export default App;
