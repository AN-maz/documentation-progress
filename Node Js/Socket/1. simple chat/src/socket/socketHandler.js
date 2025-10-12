module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('Seorang pengguna terhubung dengan id:', socket.id);

        socket.on('disconect', () => {
            console.log('Pengguna terputus:', socket.id);
        });

        socket.on('chat message', (msg) => {
            console.log('Pesan diterima:', msg);

            io.emit('chat message', msg);
        });
    });
}