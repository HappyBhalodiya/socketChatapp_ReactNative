const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    },
    receiver: {
      type:String
    },
    status: {
      type: Boolean, default: false
    }
   
  },
  {
    timestamps: true
  },
  
  
 
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;