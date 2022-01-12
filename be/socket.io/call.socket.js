const { Server } = require("socket.io");

const callSocketIo = (server) => {
  let rooms = [];

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("CREATE_NEW_ROOM", (room) => {
      rooms.push({
        id: socket.id,
        creator: room.username,
        roomId: room.id,
        members: [],
      });
    });

    socket.on("NEW_USER_REQUEST", (user) => {
      const room = rooms.find((room) => room.roomId === user.requestRoom);
      socket.to(room.id).emit("ALERT_NEW_USER_RESQUEST", user);

      console.log("request", user);
    });

    socket.on("ACCEPT_NEW_USER", (user) => {
      socket.to(user.id).emit("RESPONE_NEW_USER_REQUEST", {
        roomId: user.requestRoom,
        name: user.username,
        isAllow: true,
      });
    });

    socket.on("DECLINE_NEW_USER", (user) => {
      socket.to(user.id).emit("RESPONE_NEW_USER_REQUEST", {
        roomId: user.requestRoom,
        name: user.username,
        isAllow: false,
      });
    });

    socket.on("JOIN_ROOM", (data) => {
      socket.join(data.roomId);
      socket.roomId = data.roomId;
      rooms.forEach((room) => {
        if (room.roomId === data.roomId) {
          room.members.push({
            peerId: data.peerId,
            socketId: data.socketId,
          });
          io.to(data.roomId).emit("FETCH_ROOM_MEMBERS", room.members);
        }
      });

      socket.on("FETCH_ROOM_DATA", () => {
        try {
          const room = rooms.find((room) => room.roomId === socket.roomId);
          socket.emit("RESPONE_ROOM_DATA", room.id);
        } catch (error) {
          console.log(error.message);
        }
      });
    });

    socket.on("SYNC_VIDEO", (video) => {
      io.to(socket.roomId).emit("SYNC_VIDEO", video);
    });

    socket.on("disconnect", () => {
      //console.log("dis", socket.roomId)
      try {
        const room = rooms.find((room) => room.roomId === socket.roomId);
        const index = room.members.findIndex(
          (user) => user.socketId === socket.id
        );
        room.members.splice(index, 1);
        if (socket.id === room.id) {
          rooms.forEach(r => {
            if(r.id === socket.id && r.members.length){
              r.id = r.members[0].socketId
              console.log(r)
            }
          })
        }
        io.to(socket.roomId).emit("FETCH_ROOM_MEMBERS", room.members);
        if (room.members.length) {
          io.to(socket.roomId).emit(
            "RESPONE_ROOM_DATA",
            room.members[0].socketId
          );
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  });
};

module.exports = callSocketIo;
