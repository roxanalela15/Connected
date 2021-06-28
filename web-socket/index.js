const http = require('http');
const server = require('websocket').server;
var robot = require("robotjs");

// robot.setMouseDelay(2);
// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }

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


  connection.on("mouse-move", function(data){
    console.log("mousemove server");
    var obj = JSON.parse(data);
    var x = obj.x;
    var y = obj.y;

    robot.moveMouse(x, y);
})

connection.on("mouse-click", function(data){
    robot.mouseClick();
})

connection.on("type", function(data){
    var obj = JSON.parse(data);
    var key = obj.key;

    robot.keyTap(key);
})
  
});



// wsServer.on("mouse-move", function(data) {
//     var room = "test";
//     wsServer.broadcast.to(room).emit("mouse-move", data);
// })

// wsServer.on("mouse-click", function(data) {
//     var room = "test";
//     wsServer.broadcast.to(room).emit("mouse-click", data);
// })

// wsServer.on("type", function(data) {
//     var room = "test";
//     wsServer.broadcast.to(room).emit("type", data);
// })

wsServer.on("close", request=>{
  console.log("Server done.");
})

httpServer.listen(1337, () => {
  console.log('Server listening at port 1337');
});



// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// app.get('/view', (req, res) => {
//     res.sendFile(__dirname + '/remote.html');
// })


// io.on('request', request => {
  
//   const connection = request.accept();
//   //var room = localStorage.getItem("codeInput");
//   const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

//   connection.on('message', message => {
//     const { code } = JSON.parse(message.utf8Data);
//     if (!peersByCode[code]) {
//       peersByCode[code] = [{ connection, id }];
//     } else if (!peersByCode[code].find(peer => peer.id === id)) {
//       peersByCode[code].push({ connection, id });
//     }

//     const peer = peersByCode[code].find(peer => peer.id !== id)
//     if (peer) {
//       peer.connection.send(message.utf8Data);
//     }
//   })
// })

// io.on('connection', (socket)=> {

//     socket.on("join-message", (roomId) => {
//         socket.join(roomId);
//         console.log("User joined in a room : " + roomId);
//     })

//     socket.on("screen-data", function(data) {
//         console.log("fac screen");
//         data = JSON.parse(data);
//         var room = data.room;
//         var imgStr = data.image;
//         socket.broadcast.to(room).emit('screen-data', imgStr);
//     })

//     socket.on("mouse-move", function(data) {
//         var room = JSON.parse(data).room;
//         socket.broadcast.to(room).emit("mouse-move", data);
//     })

//     socket.on("mouse-click", function(data) {
//         var room = JSON.parse(data).room;
//         socket.broadcast.to(room).emit("mouse-click", data);
//     })

//     socket.on("type", function(data) {
//         var room = JSON.parse(data).room;
//         socket.broadcast.to(room).emit("type", data);
//     })
// })

// var server_port = process.env.YOUR_PORT || process.env.PORT || 1337;
// http.listen(server_port, () => {
//     console.log("Started on : "+ server_port);
// })