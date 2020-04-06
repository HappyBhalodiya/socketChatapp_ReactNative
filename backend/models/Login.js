const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema(
    {
        email: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },

    },
);

let User = mongoose.model("user", loginSchema);

module.exports = User;