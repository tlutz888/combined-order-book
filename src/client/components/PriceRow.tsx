/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import {
  Col, Container, ProgressBar, Row,
} from 'react-bootstrap';
import { PriceRowProps } from '../../types/propTypes';

const PriceRow: React.FC<PriceRowProps> = ({ price, entries }: PriceRowProps) => {
  let poloAsks = 0;
  let poloBids = 0;
  let bittrexAsks = 0;
  let bittrexBids = 0;

  entries.forEach((entry) => {
    const [exchange, info] = Object.entries(entry)[0];
    if (exchange === 'poloniex') {
      info.isAsk ? poloAsks += info.volume : poloBids += info.volume;
    } else {
      info.isAsk ? bittrexAsks += info.volume : bittrexBids += info.volume;
    }
  });

  return (
    <Container>
      <Row>
        <Col>
          <ProgressBar variant="success" now={poloAsks} label={poloAsks.toFixed(2)} key={1} />
          <ProgressBar variant="danger" now={bittrexAsks} label={bittrexAsks.toFixed(2)} key={2} />
        </Col>
        <Col>
          {`   ${price}   `}
        </Col>
        <Col>
          <ProgressBar variant="success" now={poloBids} label={poloBids.toFixed(2)} key={3} />
          <ProgressBar variant="danger" now={bittrexBids} label={bittrexBids.toFixed(2)} key={4} />
        </Col>
      </Row>
    </Container>
  );
};

export default PriceRow;
