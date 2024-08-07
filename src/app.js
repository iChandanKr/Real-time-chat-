const { log } = require("console");
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const socketio = require("socket.io");
const viewDirPath = path.join(__dirname, "./public");
app.use(express.static(viewDirPath));
const server = http.createServer(app);

const io = socketio(server);
let count = 0;


io.on("connection", (socket) => {
  console.log("connected!!!!");
//   socket.emit("countUpdate", count);
//   socket.on("increment", () => {
//     count++;
//     // socket.emit("countUpdate", count);
//     io.emit('countUpdate',count)
//   });
    socket.emit('message','Welcome to Chat!')
    socket.on('message',(data,callback)=>{
        console.log(data);
        io.emit('sendMessage',data);
        callback()
    })
    socket.broadcast.emit('message','A new user has joined! ')
    
    socket.on('location',(data,callback)=>{
        // console.log('in app',data)
        const{coords:{latitude,longitude}} = data;
        // console.log(latitude,longitude)
        io.emit('currentLocation',`https://google.com/maps?q=${latitude},${longitude}`)
        callback()
    })
});


const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`server is listening on ${port}...`);
});
