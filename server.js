var express = require("express");
const Person = require ("./person")
var mongoose = require("mongoose");
const { find } = require("./person");

var app = express();

//environment variables

require('dotenv').config();

//database connection

const uri = process.env.MONGO_URI;

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {

console.log("Connected Database Successfully");

});

app.listen(3000,function(req,res){

console.log("Server is started on port 3000");

});



var joe = new Person({
  name: "Joe",
  age: 24,
  favoriteFoods: ['Apple', 'Banana']
});

// joe.save(function(err, persons) {
//   if(err){
//     console.log("Failed");
//   } else {
//     console.log("Saved Successful");
//     console.log(persons);
//   }
// });
let ArrayOfPeople = [{
    name: "hamida",
    age: 28,
    favoriteFoods: ['cake', 'apple']  },
    {
        name: "amal",
        age: 27,
        favoriteFoods: ['pizza', 'coca']  
    } ,
    {
        name: "salem",
        age: 19,
        favoriteFoods: ['spagati', 'fraise']  
    }
];


/*var createManyPeople = function(ArrayOfPeople, done) {
    Person.create(ArrayOfPeople).then(
     done(null, ArrayOfPeople)

    )

};  */
//createManyPeople(ArrayOfPeople, function(err, data) {})
// find People by name
let personName ='hamida'
var findPeopleByName = function(personName, done) {
  Person.find({"name":personName},(err,data)=>{
  if(err) return done(err)
  console.log(data)
    return done(null,data)
    })  
  
  };
  /*findPeopleByName(personName, function(err, data) {});*/
  // find by food
 
  var findOneByFood = function(food) {
    Person.findOne({favoriteFoods: food})
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
    }
  ;
  // findOneByFood('pizza') 
  //find peopple by id
  var findOneByID = function(id) {
    Person.findById({_id: id})
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
    }
  ;
  findOneByID('634270c34c2fedeb0d1a3468') 
  //add food
  var findEditThenSave = function(personId) {
    var foodToAdd = 'hamburger';
    Person.findById(personId, function(err, data) {
      data.favoriteFoods.push(foodToAdd);
      data.save();
      if (err) {
        return console.log(err);
      }
      else {
        console.log(data);
      }
    });
  };
  findEditThenSave('634270c34c2fedeb0d1a3468')
  //update age of persone 
  var findAndUpdate = function(personName) {
    var ageToSet = 20;
  
    Person.findOneAndUpdate(
      {name: personName},
      {$set: {age: ageToSet}},
      {new: true},
      (err, data) => {
        if (err) return console.log(err);
        return console.log( data);
      }
    );
  };
  findAndUpdate('amal')
  //remove pperson by id
  var findRemoveOneByID = function(id) {
    Person.findOneAndDelete({_id: id})
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
    }
  ;
  findRemoveOneByID('634270c34c2fedeb0d1a346a') 
  //delete Many document
  var DeleteManyPerson = function(nameP) {
    Person.deleteMany({name: nameP})
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
    }
  ;
  DeleteManyPerson('Joe')
  //
  var queryChain = function(done) {
    var foodToSearch = 'hamburger';
    Person.find({ favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 30 })
    .exec(function(error, people) {
    console.log(people);
    });
    };
    