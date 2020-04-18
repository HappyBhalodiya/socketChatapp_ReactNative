const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var chatRouter = require("./route/chatroute");
var loginRoute = require("./route/loginroute")
const fileUpload = require('./middleware/file_upload');
let sendcontroller = {}
const multer = require('multer');

//require the http module
const http = require("http").Server(app);
var cors = require('cors');
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());        
app.use(cors());   
// require the socket.io module
const io = require("socket.io");

const port = 5000;
const Chat = require("./models/Chat");
const connect = require("./dbconnect");
//bodyparser middleware
app.use(bodyParser.json());

//routes
app.get("/chats", chatRouter.chats);
app.post("/add",fileUpload.upload('profileimage'), loginRoute.add)
app.post("/login",loginRoute.login)
app.get("/getUser", loginRoute.getUser)
app.post("/sendFile",fileUpload.upload('sendfile'),chatRouter.sendFile)
app.get('/getUserById/:id',loginRoute.getUserById);
//integrating socketio
socket = io(http);

//database connection


//setup event listener
socket.on("connection", function(socket)  { 
  const sessionID = socket.id;
  console.log("user connected");
  socket.on('join', function (data) {    
    console.log("data>>>>>>>>>>>",data)
    socket.join(data.id);
    socket.on("chat message", function(res) {

      console.log("res====>>>>", res)
      socket.to(data.id).emit('message', {msg: res.msg, id: data.id});
      socket.on("msgStatus", function(status) {
       


        if(status.status != false){
          connect.then(db => {
            Chat.findByIdAndUpdate({ _id: status.msgid }, { $set: { status: status.status } }, { upsert: true, new: true }, function (err, user) {
              console.log("update user", user);
            })
          });
        }
      })
      if(res.msg){
        connect.then(db => {
          console.log("connected correctly to the server", res.msg);
          let chatMessage = new Chat({ message: res.msg, sender: res.senderID ,receiver: data.id});
          chatMessage.save();
        });
      } 
    });
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});

































  // //Someone is typing
  // socket.on("typing", data => {
  //   socket.broadcast.emit("notifyTyping", {
  //     user: data.user,
  //     message: data.message
  //   });
  // });

  // //when soemone stops typing
  // socket.on("stopTyping", () => {
  //   socket.broadcast.emit("notifyStopTyping");
  // });

