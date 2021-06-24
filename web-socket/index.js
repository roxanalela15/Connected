const http = require('http');
const server = require('websocket').server;

const httpServer = http.createServer(() => { });
httpServer.listen(1337, () => {
  console.log('Server listening at port 1337');
});

const wsServer = new server({
  httpServer,
});

const peersByCode = {};

wsServer.on('request', request => {
  
  const connection = request.accept();
  //var room = localStorage.getItem("codeInput");
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  connection.on('message', message => {
    const { code } = JSON.parse(message.utf8Data);
    if (!peersByCode[code]) {
      peersByCode[code] = [{ connection, id }];
    } else if (!peersByCode[code].find(peer => peer.id === id)) {
      peersByCode[code].push({ connection, id });
    }

    const peer = peersByCode[code].find(peer => peer.id !== id)
    if (peer) {
      peer.connection.send(message.utf8Data);
    }
  });
  connection.on("join-message", (roomId) => {
    connection.join(roomId);
    console.log("User joined in a room : " + roomId);
  })

  connection.on("screen-data", function (data) {
    data = JSON.parse(data);
    var room = data.room;
    var imgStr = data.image;
    connection.broadcast.to(room).emit('screen-data', imgStr);
  })

  connection.on("mouse-move", function (data) {
    var room = JSON.parse(data).room;
    connection.broadcast.to(room).emit("mouse-move", data);
  })

  connection.on("mouse-click", function (data) {
    var room = JSON.parse(data).room;
    connection.broadcast.to(room).emit("mouse-click", data);
  })

  connection.on("type", function (data) {
    var room = JSON.parse(data).room;
    connection.broadcast.to(room).emit("type", data);
  })
  //connection.emit("join-message", room);
  connection.on('screen-data', function (message) {
          document.getElementById("imgid").setAttribute("src", "data:image/png;base64," + message);
        })
});

wsServer.on("close", request=>{
  console.log("Server done.");
})
