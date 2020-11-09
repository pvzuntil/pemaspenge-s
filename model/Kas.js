const mongosee = require('mongoose')

const schema = mongosee.Schema({
    name: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    idUser:{
        type: mongosee.Types.ObjectId
    }
})

module.exports = mongosee.model('kas', schema);