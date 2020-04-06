const express = require("express");
const connectdb = require("./../dbconnect");
const Chats = require("./../models/Chat");
const router = {}

router.chats = function (req, res) {
	console.log("req.body",req.body)
	res.setHeader("Content-Type", "application/json");
     res.statusCode = 200;
      connectdb.then(db => {
    let data = Chats.find({ message: "Anonymous" });
    Chats.find({}).then(chat => {
        console.log("chat====",chat)
      res.json(chat);
    });
  });
}

module.exports = router;
