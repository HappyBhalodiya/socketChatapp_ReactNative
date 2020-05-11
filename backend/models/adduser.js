const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({

	email: String,
	password:String,
	username:String,
	about:String,
	profileimage:{ type: String, default: '' },
	path:{type: String, default:''},
	checkConnection: {
      type: Boolean, default: false
    },
	
});

module.exports = mongoose.model('User', userSchema);