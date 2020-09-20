export type BittrexOrderBookType = {
  asks: BittrexOrderType;
  bids: BittrexOrderType;
};
export type PoloOrderBookType = {
  asks: PoloOrderType;
  bids: PoloOrderType;
};

export type BittrexOrderType = {
  [key: string]: number;
};
export type PoloOrderType = {
  [key: string]: string;
};

export type CacheType = {
  bittrexBook: BittrexOrderBookType;
  poloBook: PoloOrderBookType;
}