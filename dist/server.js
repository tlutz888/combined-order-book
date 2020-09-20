/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/cache.ts":
/*!*****************************!*\
  !*** ./src/server/cache.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cache = {};\nexports.default = cache;\n\n\n//# sourceURL=webpack:///./src/server/cache.ts?");

/***/ }),

/***/ "./src/server/controllers/bittrexController.ts":
/*!*****************************************************!*\
  !*** ./src/server/controllers/bittrexController.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/* eslint-disable @typescript-eslint/no-unsafe-member-access */\n/* eslint-disable @typescript-eslint/no-unsafe-call */\n/* eslint-disable @typescript-eslint/no-unsafe-assignment */\nvar util = __webpack_require__(/*! util */ \"util\");\nvar SignalRClient = __webpack_require__(/*! bittrex-signalr-client */ \"bittrex-signalr-client\");\nvar cache_1 = __webpack_require__(/*! ../cache */ \"./src/server/cache.ts\");\nvar bittrexController = {};\nbittrexController.connect = function (channel) {\n    if (channel === void 0) { channel = 'BTC-ETH'; }\n    console.log(SignalRClient);\n    var client = new SignalRClient({\n        // websocket will be automatically reconnected if server does not respond to ping after 10s\n        pingTimeout: 10000,\n        watchdog: {\n            // automatically reconnect if we don't receive markets data for 30min (this is the default)\n            markets: {\n                timeout: 1800000,\n                reconnect: true,\n            },\n        },\n        // use cloud scraper to bypass Cloud Fare (default)\n        useCloudScraper: true,\n    });\n    // -- event handlers\n    client.on('orderBook', function (data) {\n        console.log({ data: data });\n        console.log(data.data.buy.slice(0, 10));\n        // set bids in the cache\n        data.data.buy.forEach(function (_a) {\n            var rate = _a.rate, quantity = _a.quantity;\n            var newOrder = {\n                bittrex: {\n                    isAsk: false,\n                    volume: quantity,\n                },\n            };\n            if (cache_1.default[rate]) {\n                cache_1.default[rate] = __assign(__assign({}, cache_1.default[rate]), newOrder);\n            }\n            else {\n                cache_1.default[rate] = __assign({}, newOrder);\n            }\n            // cache.bittrexBook.bids[rate] = quantity;\n        });\n        // set asks in the cache\n        data.data.sell.forEach(function (_a) {\n            var rate = _a.rate, quantity = _a.quantity;\n            var newOrder = {\n                bittrex: {\n                    isAsk: true,\n                    volume: quantity,\n                },\n            };\n            if (cache_1.default[rate]) {\n                cache_1.default[rate] = __assign(__assign({}, cache_1.default[rate]), newOrder);\n            }\n            else {\n                cache_1.default[rate] = __assign({}, newOrder);\n            }\n        });\n        client.on('orderBookUpdate', function (data) {\n            console.log(util.format(\"Got order book update for pair '%s' : cseq = %d\", data.pair, data.cseq), data.data.buy);\n            data.data.buy.forEach(function (_a) {\n                var action = _a.action, rate = _a.rate, quantity = _a.quantity;\n                var newOrder = {\n                    bittrex: {\n                        isAsk: false,\n                        volume: quantity,\n                    },\n                };\n                // if it is an update, update the quantity in cache\n                cache_1.default[rate] = __assign(__assign({}, cache_1.default[rate]), newOrder);\n            });\n        });\n        client.on('trades', function (data) {\n            console.log(util.format(\"Got trades for pair '%s'\", data.pair));\n        });\n        // console.log(cache.BittrexBook)\n        // console.log(cache)\n        // cache.BittrexBook.bids\n        console.log(util.format(\"Got full order book for pair '%s' : cseq = %d\", data.pair, data.cseq));\n    });\n    // client.on('orderBookUpdate', function(data){\n    //   console.log(util.format(\"Got order book update for pair '%s' : cseq = %d\", data.pair, data.cseq));\n    // });\n    // client.on('trades', function(data){\n    //   console.log(util.format(\"Got trades for pair '%s'\", data.pair));\n    // });\n    // -- start subscription\n    console.log(\"=== Subscribing to 'USDT-BTC' pair\");\n    client.subscribeToMarkets([channel]);\n};\nexports.default = bittrexController;\n\n\n//# sourceURL=webpack:///./src/server/controllers/bittrexController.ts?");

/***/ }),

/***/ "./src/server/controllers/poloController.ts":
/*!**************************************************!*\
  !*** ./src/server/controllers/poloController.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar NodeWebSocket = __webpack_require__(/*! ws */ \"ws\");\nvar cache_1 = __webpack_require__(/*! ../cache */ \"./src/server/cache.ts\");\nvar poloController = {};\npoloController.connect = function (channel) {\n    if (channel === void 0) { channel = 'BTC_ETH'; }\n    var ws = new NodeWebSocket('wss://api2.poloniex.com');\n    ws.on('open', function () {\n        // const channel = \"BTC_ETH\";\n        var subscribeMessage = { command: 'subscribe', channel: channel };\n        var request = JSON.stringify(subscribeMessage);\n        console.log('opened', { request: request });\n        ws.send(request);\n        // .catch(err => console.log(err))\n        // .then(res => console.log('hi'))\n    });\n    /*\n        possible responses:\n  \n        // dump of the whole order book\n        [ <channel id>,\n          <sequence number>,\n          [\n            [\n              \"i\",\n              {\n                \"currencyPair\": \"<currency pair name>\",\n                \"orderBook\": [\n                  {\n                    \"<lowest ask price>\": \"<lowest ask size>\",\n                    \"<next ask price>\": \"<next ask size>\",\n                    ...\n                  },\n                  { \"<highest bid price>\": \"<highest bid size>\",\n                    \"<next bid price>\": \"<next bid size>\",\n                    ...\n                  }\n                ]\n              }\n            ]\n          ]\n        ]\n  \n        individual trades\n        [ <channel id>, <sequence number>,\n          [\n            [\n              \"o\",\n              <1 for bid 0 for ask>,\n              \"<price>\",\n              \"<size>\"\n            ],\n            [\n              \"o\",\n              <1 for bid 0 for ask>,\n              \"<price>\",\n              \"<size>\"\n            ],\n            [\n              \"t\",\n              \"<trade id>\",\n              <1 for buy 0 for sell>,\n              \"<price>\",\n              \"<size>\",\n              <timestamp>\n            ]\n          ]\n          ...\n        ]\n  \n        or\n        [1010] - heartbeat to show we're still connected\n        */\n    ws.on('message', function (message) {\n        var data = JSON.parse(message);\n        var updates = data[2];\n        if (updates) {\n            updates.forEach(function (update) {\n                var action = update[0];\n                // dump entire order book\n                if (action === 'i') {\n                    // console.log(Object.keys(update[1]))\n                    var _a = update[1].orderBook, asks = _a[0], bids = _a[1];\n                    console.log('*********', Object.entries(asks)[0]);\n                    Object.entries(asks).forEach(function (_a) {\n                        var rate = _a[0], quantity = _a[1];\n                        var newOrder = {\n                            poloniex: {\n                                isAsk: true,\n                                volume: Number(quantity),\n                            },\n                        };\n                        if (cache_1.default[rate]) {\n                            cache_1.default[rate] = __assign(__assign({}, cache_1.default[rate]), newOrder);\n                        }\n                        else {\n                            cache_1.default[rate] = __assign({}, newOrder);\n                        }\n                    });\n                    Object.entries(bids).forEach(function (_a) {\n                        var rate = _a[0], quantity = _a[1];\n                        var newOrder = {\n                            poloniex: {\n                                isAsk: false,\n                                volume: Number(quantity),\n                            },\n                        };\n                        if (cache_1.default[rate]) {\n                            cache_1.default[rate] = __assign(__assign({}, cache_1.default[rate]), newOrder);\n                        }\n                        else {\n                            cache_1.default[rate] = __assign({}, newOrder);\n                        }\n                    });\n                    // cache.poloBook = { asks, bids };\n                    if (action === 'o') {\n                        // we have an order, need to update the cache\n                    }\n                }\n            });\n        }\n    });\n};\nexports.default = poloController;\n\n\n//# sourceURL=webpack:///./src/server/controllers/poloController.ts?");

/***/ }),

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\nrouter.get('/api/sup', function (req, res, next) {\n    res.json('y\\'all');\n});\nexports.default = router;\n\n\n//# sourceURL=webpack:///./src/server/routes.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar http = __webpack_require__(/*! http */ \"http\");\nvar Server = __webpack_require__(/*! socket.io */ \"socket.io\");\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\nvar cache_1 = __webpack_require__(/*! ./cache */ \"./src/server/cache.ts\");\nvar poloController_1 = __webpack_require__(/*! ./controllers/poloController */ \"./src/server/controllers/poloController.ts\");\nvar bittrexController_1 = __webpack_require__(/*! ./controllers/bittrexController */ \"./src/server/controllers/bittrexController.ts\");\nvar app = express();\nvar server = http.createServer(app);\nvar io = Server(server);\napp.use(express.static('public'));\nio.on('connection', function (socket) {\n    console.log('a user connected');\n    // socket.on('updateServerState', (msg, senderId) => {\n    //   // set cached state and broadcast to clients\n    //   // cache.set('state', msg);\n    //   console.log(msg.users);\n    //   // io.emit('updateClientState', cache.get('state'), senderId);\n    // });\n    // // if board has already been initialized, send state to client\n    socket.on('getBittrexBook', function () {\n        io.emit('bittrexFullBook', cache_1.default.bittrexBook);\n        // io.emit('full order book', cache);\n        io.emit('response', 'hi');\n        //   // if (cache.get('users')) io.emit('updateClientState', cache.get('state'));\n        //   // else (io.emit('firstUser'));\n    });\n    socket.on('getPoloBook', function () {\n        io.emit('poloFullBook', cache_1.default.poloBook);\n    });\n    socket.on('getFullBook', function () {\n        io.emit('fullOrderBook', cache_1.default);\n    });\n});\n// app.get('*', (req, res) => {\n//   console.log('using express')\n//   res.json('responding')\n// })\napp.use(routes_1.default);\nvar port = process.env.PORT || 3000;\n// app.listen(port, () => console.log(`Server listening on port: ${port}`));\nserver.listen(3000, function () {\n    console.log(\"Server listening on port: \" + port);\n    poloController_1.default.connect();\n    bittrexController_1.default.connect();\n});\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "bittrex-signalr-client":
/*!*****************************************!*\
  !*** external "bittrex-signalr-client" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bittrex-signalr-client\");\n\n//# sourceURL=webpack:///external_%22bittrex-signalr-client%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ });