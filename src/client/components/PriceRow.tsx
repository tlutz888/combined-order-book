import React from 'react';
import {
  Card,
  Col, Container, ProgressBar, Row,
} from 'react-bootstrap';
import { PriceRowProps } from '../../types/propTypes';

const PriceRow: React.FC<PriceRowProps> = ({ price, entries, maxVolume }) => {
  // if (!volume) return <div />;
  // const { bittrex, poloniex } = volume;
  // const poloniexSize = `${Math.ceil(Number(poloniex) * 10000)} px`;
  let poloAsks = 0;
  let poloBids = 0;
  let bittrexAsks = 0;
  let bittrexBids = 0;
  entries.forEach((entry) => {
    const [exchange, info] = Object.entries(entry)[0];
    // const info = Object.entries[1]
    // console.log(info)
    if (exchange === 'poloniex') {
      info.isAsk ? poloAsks += info.volume : poloBids += info.volume;
    } else {
      info.isAsk ? bittrexAsks += info.volume : bittrexBids += info.volume;
    }
  });
  // console.log(bittrexAsks / Math.sqrt(maxVolume) * 100)

  return (
    <Container>
      {/* <Card body> */}
      <Row>

        <Col>
          {/* {`Polo Volume:    ${poloAsks}`} */}
          <ProgressBar variant="success" now={poloAsks} label={poloAsks.toFixed(2)} key={1} />
          {/* {`Bittrex Volume: ${bittrexAsks}`} */}
          <ProgressBar variant="danger" now={bittrexAsks} label={bittrexAsks.toFixed(2)} key={2} />
        </Col>

        <Col>
          {` -- ${price}-- `}
        </Col>
        <Col>
          <ProgressBar variant="success" now={poloBids} label={poloBids.toFixed(2)} key={3} />
          {/* {`Polo Volume:    ${poloBids}`} */}
          <ProgressBar variant="danger" now={bittrexBids} label={bittrexBids.toFixed(2)} key={4} />
          {/* {`Bittrex Volume: ${bittrexBids}`} */}

        </Col>
      </Row>

      {/* </Card> */}

    </Container>

  );
};

export default PriceRow;
