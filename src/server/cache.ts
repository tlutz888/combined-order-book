// const memoryCache = module.exports = function () {
const cache = {
  poloBook: {
    asks:{},
    bids:{}
  },
  BittrexBook: {},
};
  // return {
  //   get: (key) => cache[key],
  //   set: (key, val) => cache[key] = val,
  // };
// };

export default cache;