// const memoryCache = module.exports = function () {
const cache = {
  poloBook: {
    asks:{},
    bids:{}
  },
  BittrexBook: {
    asks:{},
    bids:{}
  },
};
  // return {
  //   get: (key) => cache[key],
  //   set: (key, val) => cache[key] = val,
  // };
// };

export default cache;