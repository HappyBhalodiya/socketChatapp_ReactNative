const express = require("express");
const router = express.Router();
const connectdb = require("./../dbconnect");
const User = require("../models/Login")

router.route("/").post((req, res) => {
console.log("=====",req.body)
 
  connectdb.then(db => {
  var user = User(req.body);
	user.save(function (err, savedUser) {
		res.status(200).send(savedUser);
		console.log("body", savedUser);
  })
})
});

module.exports = router;