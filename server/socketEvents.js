'use strict'

const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`New socket connection: SocketId: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`SocketId: ${socket.id} disconnected`)
    })

    //broadcast new message to all sockets
    socket.on('newMessage', (newMessage) => {
      socket.broadcast.emit('addMessage', newMessage)
    })
  })
}

module.exports = socketEvents