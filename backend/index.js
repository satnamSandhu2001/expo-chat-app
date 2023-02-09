const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: [process.env.CLIENT_URI, 'http://localhost:19006'] },
});

app.use(express.json());

app.get('/', (req, res) => {
  // res.json({ data: 'Hello from socket' });
  res.sendFile(path.join(__dirname) + '/index.html');
});

io.on('connection', (socket) => {
  // console.log('socket connection ready : ', socket.id);
  socket.on('login', (data) => {
    console.log('login emit: ', data);
  });

  socket.on('send-message', (data) => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AmPm = 'AM';
    if (hours > 12) {
      hours -= 12;
      AmPm = 'PM';
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    data.time = hours + ':' + minutes + ' ' + AmPm;
    console.log(data);
    socket.broadcast.emit('message-recieved', { data });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Sever is Running at http://localhost:${PORT}`);
});
