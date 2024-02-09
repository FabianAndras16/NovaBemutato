var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Choir = db.model("Choir",new Schema({
    name: String,
    maestro: String,
    foundation: String,
    numberOfMembers: Number
},{collection:"Choir"}))

module.exports = Choir;