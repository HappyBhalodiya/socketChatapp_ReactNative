var userModel = require('../models/adduser');
let controller = {};
const connectdb = require("./../dbconnect");
controller.add = function (req, res) {
	console.log("=========data>>>>>>>>>>>>>>",req.body, req.file);


	const userData = req.file == undefined ?{
		email: req.body.email,
		password: req.body.password,
		username: req.body.username
	} : {
		email: req.body.email,
		password: req.body.password,
		username: req.body.username,
		profileimage: req.file.originalname,
		path:req.file.path
	}
	connectdb.then(db => {
		var user = new userModel(userData);
		user.save(function (err, savedUser) {

			console.log("+++++++++++++++++",savedUser)			
			return res.status(200).json({ message : "Show User" , result: { User: savedUser}} )
			
		})
	})
}

controller.login = function (req, res) {
	console.log(req.body.email, req.body.password)
	userModel.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {

		
		if (err)
			return res.status(500).send();
		if (!user){
			return res.status(404).json({ message : "User not found"});
		}else{
			return res.status(200).json({ message : "Login successfully" , result :{user} } )

		}
		// console.log("login", user);
		res.send(user);
	})
}

controller.getUser = function (req, res) {
	userModel.find({}, function (err, user) {
		
		if (err)
			return res.status(500).send();
		if (!user)
			return res.status(404).send();
		res.status(200).json({ message : "Get all user" , result : user } )

	})
}

module.exports = controller;


