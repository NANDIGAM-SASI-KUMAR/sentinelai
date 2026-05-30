export function initSockets(io) {
  io.on('connection', (socket) => {
    console.log('[ws] client connected', socket.id);
    socket.on('disconnect', () => console.log('[ws] disconnected', socket.id));
  });
}
