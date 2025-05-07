import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
//Para tener nuestra app de express con todas sus rutas y middleware
//agregamos nuestra app de express a un servidor http
const server = createServer(app);
//y tenemos los websockets en el mismo servidor
const io = new Server(server, {
  connectionStateRecovery: {},
});

// console.log('url ', process.env.DB_URL);
// console.log('token ', process.env.DB_TOKEN);
// console.log('+++++++++++++++++++++++++++++++++++');
const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN,
});

await db.execute(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

io.on('connection', async (socket) => {
  console.log('Auth data from client:', socket.handshake.auth);
  console.log('a user has connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //escuchamos el evento de chat message y lo mostramos en consola
  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);
    let result;
    try {
      result = await db.execute({
        sql: `INSERT INTO messages (content) VALUES (:msg)`,
        args: { msg },
      });
    } catch (error) {
      console.error('Error inserting message:', error);
      return;
    }
    //emit to all clients
    io.emit('chat message', msg, result.lastInsertRowid.toString()); //enviamos el mensaje a todos los clientes conectados
    //enviamos el mensaje a todos los clientes conectados
  });

  // console.log('info of socket');
  // console.log(socket.handshake);
  // console.log(socket.handshake.auth);

  if (!socket.recovered) {
    //recuperar los mensajes  sin conexion
    try {
      const result = await db.execute({
        sql: 'SELECT id, content, created_at FROM messages where id > ? ',
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      result.rows.forEach((row) => {
        socket.emit('chat message', row.content, row.id.toString()); //enviamos el mensaje a todos los clientes conectados
      });
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  }
});

//usarlo en modo de desarrollo
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
