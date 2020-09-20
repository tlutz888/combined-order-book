export type BittrexOrderBookType = {
  asks: BittrexOrderType;
  bids: BittrexOrderType;
};

export type FullOrderBookType = {

};
export type PoloOrderBookType = {
  asks: PoloOrderType;
  bids: PoloOrderType;
};

export type BittrexOrderType = {
  [key: string]: number;
};
export type PriceOrderType = {
  // price
  [key: string]: ExchangeOrderType;

};
export type RoundedOrderBookType = {
  [key: string]: Array<ExchangeOrderType>;
}

export type BittrexResponseType = {
  rate: string;
  quantity: number;
}
export type ExchangeOrderType = {
  // exchange name
  [key: string]: {
    isAsk: boolean;
    volume: number;
  }
};

export type PoloOrderType = {
  [key: string]: string;
};

export type CacheType = {
  asks: {
    bittrex?: BittrexOrderType;
    poloniex?: PoloOrderType;
  };
  bids: {
    bittrex?: BittrexOrderType;
    poloniex?: PoloOrderType;
  };

};
