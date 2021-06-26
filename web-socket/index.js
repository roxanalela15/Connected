const http = require('http');
const server = require('websocket').server;

//create server
const httpServer = http.createServer(() => { });


//init server
const wsServer = new server({
  httpServer,
});

// let http = require('http');
// let server = http.Server(app);
// let socketIO = require('socket.io');
// let wsServer = socketIO(server);

//

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


connection.on("mouse-move", function(data) {
    var room = localStorage.getItem("codeInput");
    connection.broadcast.to(room).emit("mouse-move", data);
})

connection.on("mouse-click", function(data) {
    var room = localStorage.getItem("codeInput");
    connection.broadcast.to(room).emit("mouse-click", data);
})

connection.on("type", function(data) {
    var room = localStorage.getItem("codeInput");
    connection.broadcast.to(room).emit("type", data);
})
  
});

wsServer.on("close", request=>{
  console.log("Server done.");
})

httpServer.listen(1337, () => {
  console.log('Server listening at port 1337');
});