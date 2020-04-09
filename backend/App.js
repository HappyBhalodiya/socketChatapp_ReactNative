const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var chatRouter = require("./route/chatroute");
var loginRoute = require("./route/loginroute")
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
app.post("/add", loginRoute.add)
app.post("/login",loginRoute.login)
app.get("/getUser", loginRoute.getUser)

//integrating socketio
socket = io(http);

//database connection


//setup event listener
socket.on("connection", socket => {
  console.log("user connected",  socket.id);

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  //Someone is typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

  //when soemone stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });

  socket.on("chat message", function(res) {
    
    console.log("message==========: " + JSON.stringify(res[0].msg), JSON.stringify(res[0].senderid));
    socket.emit("chat message", res[0].msg);
    //save chat to the database
    connect.then(db => {
      console.log("connected correctly to the server");
      let chatMessage = new Chat({ message: res[0].msg, sender: res[0].senderid,receiver: res[0].receiver });
      chatMessage.save();
    });
  });
});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});

