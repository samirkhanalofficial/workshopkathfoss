const mongo = require('mongoose')

const schema = mongo.Schema({
    name: {
        type: String,
        required: true,
        length: 3
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongo.model('User', schema)