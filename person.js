const mongoose = require("mongoose")

let Person = new mongoose.Schema({
 name : String,
 age : Number,
 favoriteFoods : [String]
})
module.exports =  mongoose.model("Person",Person)