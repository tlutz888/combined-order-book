import * as express from 'express';
import * as http from 'http';
import * as Server from 'socket.io';
import apiRouter from './routes';
import cache from './cache';

import poloController from './controllers/poloController';
import bittrexController from './controllers/bittrexController';

const app = express();

const server = http.createServer(app);
const io = Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  // socket.on('updateServerState', (msg, senderId) => {
  //   // set cached state and broadcast to clients
  //   // cache.set('state', msg);
  //   console.log(msg.users);
  //   // io.emit('updateClientState', cache.get('state'), senderId);
  // });

  // // if board has already been initialized, send state to client
  socket.on('getBittrexBook', () => {
    io.emit('bittrexFullBook', cache.bittrexBook);
    // io.emit('full order book', cache);
    io.emit('response', 'hi');
  //   // if (cache.get('users')) io.emit('updateClientState', cache.get('state'));
  //   // else (io.emit('firstUser'));
  });

  socket.on('getPoloBook', () => {
    io.emit('poloFullBook', cache.poloBook);
  });
  socket.on('getFullBook', () => {
    io.emit('fullOrderBook', cache);
  });
});

// app.get('*', (req, res) => {
//   console.log('using express')
//   res.json('responding')
// })

app.use(apiRouter);

const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server listening on port: ${port}`));
server.listen(3000, () => {
  console.log(`Server listening on port: ${port}`);
  poloController.connect();
  bittrexController.connect();
});
