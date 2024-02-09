const Schema = require('mongoose').Schema;
var db = require('../config/db');

const Member = db.model("Member", new Schema({
    name: String,
    email: String,
    voice: String,
    folderNumber: Number,
    joiningYear: String,
    _choirMember: {
        type: Schema.Types.ObjectId,
        ref: 'Choir'
    }

}, { collection: "Member" }));

module.exports = Member