const { Server } = require("socket.io");

const callSocketIo = (server) => {
  let rooms = [];

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {

    socket.on("NEW_USER_REQUEST", (user) => {
      const room = rooms.find(room => room.roomId === user.requestRoom)
      socket.to(room.id).emit("ALERT_NEW_USER_RESQUEST", user)
      
      console.log('request', user)
      
    });

    socket.on("CREATE_NEW_ROOM", (room) => {
      rooms.push({
        id: socket.id,
        creator: room.username,
        roomId: room.id,
        members : []
      });
    });

    socket.on("ACCEPT_NEW_USER", (user)=>{
      
      socket.to(user.id).emit("RESPONE_NEW_USER_REQUEST", ({
        roomId : user.requestRoom,
        name : user.username,
        isAllow : true
      }))
    });
    socket.on("DECLINE_NEW_USER", (user)=>{
      socket.to(user.id).emit("RESPONE_NEW_USER_REQUEST", ({
        roomId : user.requestRoom,
        name : user.username,
        isAllow : false
      }))
    });
    socket.on("JOIN_ROOM", (data)=>{
      socket.join(data.roomId)
      rooms.forEach(room => {
        if(room.roomId === data.roomId){
          room.members.push(data.peerId)
          io.to(data.roomId).emit("FETCH_ROOM_MEMBERS", room.members)
        }
      })
    })
  });
};

module.exports = callSocketIo;
