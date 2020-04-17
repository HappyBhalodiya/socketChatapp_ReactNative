const express = require("express");
const connectdb = require("./../dbconnect");
const Chats = require("./../models/Chat");
const router = {}

router.chats = function (req, res) {
	console.log("req.body===========",req.body)
	res.setHeader("Content-Type", "application/json");
     res.statusCode = 200;
      connectdb.then(db => {
    let data = Chats.find({ message: "Anonymous" });
    Chats.find({}).then(chat => {
        // console.log("chat====",chat)
      res.json(chat);
    });
  });
}

router.sendFile = function (req, res) {
  console.log("req.body===========",req.body, req.file)

  const sendData = req.file != undefined ?{
     
     sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message,
    sendfile: req.file.originalname,
    path:req.file.path
  }: null
  connectdb.then(db => {
    var send = new Chats(sendData);
    send.save(function (err, savedUser) {

      console.log("+++++++++++++++++",savedUser)      
      return res.status(200).json({ message : "Show User" , result: { User: savedUser}} )
      
    })
  })

}


module.exports = router;
