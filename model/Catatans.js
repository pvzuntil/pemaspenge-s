const mongoose = require("mongoose");

const schema = mongoose.Schema({
    desc: {
        type: String
    },
    amount:{
        type: Int16Array
    },
    type:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    idKas:{
        type: mongoose.Types.ObjectId
    },
    idUser:{
        type: mongoose.Types.ObjectId
    }
})

const Catatans = mongoose.model('catatans', schema)

module.exports = Catatans