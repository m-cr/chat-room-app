const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`New socket connection: SocketId: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`SocketId: ${socket.id} disconnected`)
    })

    socket.on('newMessage', (newMessage) => {
      socket.broadcast.emit('addMessage', newMessage)
    })
  })
}

module.exports = socketEvents