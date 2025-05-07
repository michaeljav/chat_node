import express from 'express';
import logger from 'morgan';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 3000;

const app = express();
//Para tener nuestra app de express con todas sus rutas y middleware
//agregamos nuestra app de express a un servidor http
const server = createServer(app);
//y tenemos los websockets en el mismo servidor
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //escuchamos el evento de chat message y lo mostramos en consola
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    //enviamos el mensaje a todos los clientes conectados
  });
});

//usarlo en modo de desarrollo
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
