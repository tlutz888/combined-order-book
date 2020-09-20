const express = require('express');
import apiRouter from './routes';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
import cache from './cache';


import poloController from './controllers/poloController';
import bittrexController from './controllers/bittrexController';

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
  socket.on('getInitialState', () => {
    io.emit('poloUpdate', cache.poloBook)
    io.emit('bittrexUpdate', cache.BittrexBook)
    io.emit('full order book', cache)
    io.emit('response', 'hi')
  //   // if (cache.get('users')) io.emit('updateClientState', cache.get('state'));
  //   // else (io.emit('firstUser'));
  });
});

// app.get('*', (req, res) => {
//   console.log('using express')
//   res.json('responding')
// })

app.use(apiRouter);



const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server listening on port: ${port}`));
server.listen(3000, ()=> {
  console.log(`Server listening on port: ${port}`)
  poloController.connect();
  bittrexController.connect();
});
