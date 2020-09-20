import React from 'react';
import { PriceRowProps } from '../../types/propTypes';

const PriceRow: React.FC<PriceRowProps> = ({ price, entries }) => {
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

  return (
    <div>
      {/* {[poloAsks, poloBids, bittrexAsks, bittrexBids]} */}
      <span
        style={{ width: poloAsks, backgroundColor: 'red' }}
      >
        {poloAsks}
      </span>
      {' '}
      <span
        style={{ width: bittrexAsks, backgroundColor: 'blue' }}
      >
        {bittrexAsks}
      </span>
      {` -- ${price} -- `}
      <span
        style={{ width: bittrexBids, backgroundColor: 'cyan' }}
      >
        {bittrexBids}
      </span>
      {' '}
      <span
        style={{ width: poloBids, backgroundColor: 'pink' }}
      >
        {poloBids}
      </span>
    </div>
  );
};

export default PriceRow;
