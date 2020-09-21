/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

  socket.on('getFullBook', (msg) => {
    poloController.connect(msg.poloniex);
    bittrexController.connect(msg.bittrex);

    io.emit('fullOrderBook', cache);
  });
});

// app.get('*', (req, res) => {
//   console.log('using express')
//   res.json('responding')
// })

app.use(apiRouter);

const PORT = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server listening on port: ${port}`));
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${PORT}`);

  // poloController.connect();
  // bittrexController.connect();
});
