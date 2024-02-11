const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
// const cors = require('cors')
const app = express();
const server = http.createServer(app);
// const io = socketIO(server);

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (message) => {

    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const port = "4002";

server.listen(port, () => {
  console.log(`App running on port ${port}`)
})