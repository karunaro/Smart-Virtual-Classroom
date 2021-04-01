module.exports = (io) => { 
    io.on('connection', (socket) => { 
        console.log('im connteccd')
        socket.on('JoinRoom', (roomId) => { 
          socket.join(roomId)
          console.log(roomId) 
          socket.on('ChatMessageToServer', (data) => { console.log(data.username); io.to(roomId).emit('ChatMessageFromServer', data) } )
          socket.on('WhiteBoardDrawingToServer', (data) => socket.to(roomId).emit('WhiteBoardDrawingFromServer', data));
        })
      
        socket.on('disconnect', () => console.log('im disconnected'))
        //setInterval( () => socket. )
      })
 }
