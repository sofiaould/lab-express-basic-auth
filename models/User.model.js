// User model here
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        unique: true,
        required: [true, 'Username is required']
    },
    hashedPassword : {
        type:String,
        unique: true,
        required: [true, 'Password is required']
    }
},
    {
        timestamps: true
    }
)

module.exports = model('User',UserSchema)
