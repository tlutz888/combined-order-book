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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// const memoryCache = module.exports = function () {\nvar cache = {\n    poloBook: {\n        asks: {},\n        bids: {}\n    },\n    BittrexBook: {},\n};\n// return {\n//   get: (key) => cache[key],\n//   set: (key, val) => cache[key] = val,\n// };\n// };\nexports.default = cache;\n\n\n//# sourceURL=webpack:///./src/server/cache.ts?");

/***/ }),

/***/ "./src/server/controllers/poloController.ts":
/*!**************************************************!*\
  !*** ./src/server/controllers/poloController.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cache_1 = __webpack_require__(/*! ../cache */ \"./src/server/cache.ts\");\nvar NodeWebSocket = __webpack_require__(/*! ws */ \"ws\");\nvar poloController = {};\npoloController.connect = function (channel) {\n    if (channel === void 0) { channel = \"BTC_ETH\"; }\n    var ws = new NodeWebSocket(\"wss://api2.poloniex.com\");\n    ws.on(\"open\", function () {\n        // const channel = \"BTC_ETH\";\n        var subscribeMessage = { command: \"subscribe\", channel: channel };\n        var request = JSON.stringify(subscribeMessage);\n        console.log(\"opened\", { request: request });\n        ws.send(request);\n        // .catch(err => console.log(err))\n        // .then(res => console.log('hi'))\n    });\n    /*\n    possible responses:\n\n    // dump of the whole order book\n    [ <channel id>,\n      <sequence number>,\n      [\n        [\n          \"i\",\n          {\n            \"currencyPair\": \"<currency pair name>\",\n            \"orderBook\": [\n              {\n                \"<lowest ask price>\": \"<lowest ask size>\",\n                \"<next ask price>\": \"<next ask size>\",\n                ...\n              },\n              { \"<highest bid price>\": \"<highest bid size>\",\n                \"<next bid price>\": \"<next bid size>\",\n                ...\n              }\n            ]\n          }\n        ]\n      ]\n    ]\n\n    individual trades\n    [ <channel id>, <sequence number>,\n      [\n        [\n          \"o\",\n          <1 for bid 0 for ask>,\n          \"<price>\",\n          \"<size>\"\n        ],\n        [\n          \"o\",\n          <1 for bid 0 for ask>,\n          \"<price>\",\n          \"<size>\"\n        ],\n        [\n          \"t\",\n          \"<trade id>\",\n          <1 for buy 0 for sell>,\n          \"<price>\",\n          \"<size>\",\n          <timestamp>\n        ]\n      ]\n      ...\n    ]\n\n    or\n    [1010] - heartbeat to show we're still connected\n    */\n    ws.on(\"message\", function (message) {\n        var data = JSON.parse(message);\n        var updates = data[2];\n        if (updates) {\n            updates.forEach(function (update) {\n                var action = update[0];\n                // dump entire order book\n                if (action === 'i') {\n                    // console.log(Object.keys(update[1]))\n                    var _a = update[1].orderBook, asks = _a[0], bids = _a[1];\n                    cache_1.default.poloBook = { asks: asks, bids: bids };\n                    console.log(Object.keys(asks).length);\n                }\n                if (action === 'o') {\n                    // we have an order, need to update the cache\n                }\n            });\n        }\n    });\n};\nexports.default = poloController;\n\n\n//# sourceURL=webpack:///./src/server/controllers/poloController.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\nvar app = express();\nvar server = __webpack_require__(/*! http */ \"http\").createServer(app);\nvar io = __webpack_require__(/*! socket.io */ \"socket.io\")(server);\nvar cache_1 = __webpack_require__(/*! ./cache */ \"./src/server/cache.ts\");\nvar poloController_1 = __webpack_require__(/*! ./controllers/poloController */ \"./src/server/controllers/poloController.ts\");\napp.use(express.static('public'));\nio.on('connection', function (socket) {\n    console.log('a user connected');\n    // socket.on('updateServerState', (msg, senderId) => {\n    //   // set cached state and broadcast to clients\n    //   // cache.set('state', msg);\n    //   console.log(msg.users);\n    //   // io.emit('updateClientState', cache.get('state'), senderId);\n    // });\n    // // if board has already been initialized, send state to client\n    socket.on('getInitialState', function () {\n        io.emit('poloUpdate', cache_1.default.poloBook);\n        io.emit('response', 'hi');\n        //   // if (cache.get('users')) io.emit('updateClientState', cache.get('state'));\n        //   // else (io.emit('firstUser'));\n    });\n});\n// app.get('*', (req, res) => {\n//   console.log('using express')\n//   res.json('responding')\n// })\napp.use(routes_1.default);\nvar port = process.env.PORT || 3000;\n// app.listen(port, () => console.log(`Server listening on port: ${port}`));\nserver.listen(3000, function () {\n    console.log(\"Server listening on port: \" + port);\n    poloController_1.default.connect();\n});\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

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

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ });