const mongoose = require('mongoose');

main().catch(err => console.log(err));

// This section means connect to mongodb and create fruitsDB database inside that
async function main() {
    await mongoose.connect('mongodb://localhost:27017/fruitsDB');
  }

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

//  MongoDB will automatically pluralize the collection name
// const fruit = new Fruit({
//     name: 'Apple',
//     rating: 7,
//     review: 'Pretty solid as fruit!'
// });

// Comment out this section to prevent mongoose to 
    // save fruit to fruits collection everytime you run server.js
// fruit.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const People = mongoose.model('People', peopleSchema);

const people = new People({
    name: 'John',
    age: 37
});

people.save();

const apple = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'Pretty solid as fruit!'
});

const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 10,
    review: 'The best fruit!'
});

const orange = new Fruit({
    name: 'Orange',
    rating: 4,
    review: 'Too sour for me!'
});

const banana = new Fruit({
    name: 'Banana',
    rating: 3,
    review: 'Weird texture!'
});

Fruit.insertMany([apple, kiwi, orange, banana], function(error){
    if(error){
        console.log(error);
    } else {
        console.log('New entries are added to the database!');
    }
});

// Read the fruits collection
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else {
        console.log(fruits);
    }
});