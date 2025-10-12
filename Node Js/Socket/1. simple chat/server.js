const initializeSocket = require('./src/socket/socketHandler');
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');

const server = http.createServer(app);
const io = new Server(server);

initializeSocket(io);
app.set('socketio', io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});