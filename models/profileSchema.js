const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    coins: {type: Number, default: 1000},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 1}
})

const model = mongoose.model("ProfileModel", profileSchema)

module.exports = model;