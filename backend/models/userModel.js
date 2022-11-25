const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type:  String,
        required: [true, 'Add a name']
    },
    email: {
        type:  String,
        required: [true, 'Add an Email address'],
        unique: true
    },
    password: {
        type:  String,
        required: [true, 'Add a password']
    },
},
{
    timestamp: true
}
)

module.exports = mongoose.model('User', userSchema)