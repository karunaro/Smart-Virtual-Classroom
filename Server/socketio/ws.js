const User = require("../models/user")
module.exports = (io) => { 
  const rooms = []
    io.on('connection', (socket) => {
        socket.on('JoinRoom', async ({ thisRoom: roomId, username: userID } ) => { 
          socket.join(roomId)
          const findRoom = rooms.filter( room => room.roomId === roomId )[0]
          const userFromDB = await User.findById(userID)
          
          if(!findRoom){
            if(userFromDB.role === 'professor' )
            {
              rooms.push( { roomId, adminID: userID, userIDs: [ ] } )
              socket.emit('adminID', userID )
            }
            else{
              rooms.push( { roomId, adminID: null, userIDs: [ userID ] } )
              socket.emit('adminID', null )
            }
            socket.emit('ParticipantsIDs', [] )
          }
          else{
            socket.emit('ParticipantsIDs', findRoom.userIDs)
            socket.emit('adminID', findRoom.adminID )
            const findUser = findRoom.userIDs.filter( Searchusername => Searchusername === userID )[0]
            if( !findUser && userFromDB.role !== 'professor' )
            {
              findRoom.userIDs.push(userID)
            }
            else if(userFromDB.role === 'professor')
              findRoom.adminID = userID
          }

          io.to(roomId).emit('NbrOfStudents', findRoom ? findRoom.userIDs.length : 0 )
          socket.on('ChatMessageToServer', (data) => { io.to(roomId).emit('ChatMessageFromServer', data) } )
          socket.on('WhiteBoardDrawingToServer', (data) => socket.to(roomId).emit('WhiteBoardDrawingFromServer', data));

          socket.on('disconnect', () => {
            const findRoom = rooms.filter( room => room.roomId === roomId )[0]
            if(findRoom)
            {
              if(userFromDB.role !== 'professor' )
                socket.to(roomId).emit('userLeftRoom', userID)
              findRoom.userIDs = findRoom.userIDs.filter( Searchusername => Searchusername !== userID )
              if(userFromDB.role === 'professor')
                findRoom.adminID = null
              if(findRoom.userIDs.length === 0 && !findRoom.adminID )
                {
                  rooms.splice( rooms.indexOf(findRoom), 1 )
                }
              io.to(roomId).emit('NbrOfStudents', findRoom.userIDs.length ? findRoom.userIDs.length : 0 )
            }
          })
        })
        //setInterval( () => console.log(rooms), 5000 )
      })
 }
