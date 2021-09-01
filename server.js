const mongoose = require("mongoose");

const { Fruit } = require("./schema/FruitSchema");
const { People } = require("./schema/PeopleSchema");

main().catch((err) => console.log(err));

// This section means connect to mongodb and create fruitsDB database inside that
async function main() {
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");
}

//  MongoDB will automatically pluralize the collection name
// const fruit = new Fruit({
//     name: 'Apple',
//     rating: 7,
//     review: 'Pretty solid as fruit!'
// });

// Comment out this section to prevent mongoose to
// save fruit to fruits collection everytime you run server.js
// fruit.save();

// ===============================
// Create People Object
const people = new People({
  name: "John",
  age: 37,
});

people.save();

// ===============================

// ===============================
// Create Fruit Objects
const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as fruit!",
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!",
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour for me!",
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture!",
});
// ===============================

// ===============================
// mongo operation functions

const insertData = (dataToInsert) => {
  return new Promise((res, rej) => {
    Fruit.insertMany(dataToInsert, function (error) {
      if (error) {
        console.log(error);
        rej("Error");
      } else {
        console.log("New entries are added to the database!");
        res("Success");
      }
    });
  });
};

const findData = () => {
  return new Promise((res, rej) => {
    Fruit.find(function (err, fruits) {
      if (err) {
        console.log(err);
        rej([]);
      } else {
        console.log(fruits);
        res(fruits);
      }
    });
  });
};

const dataToInsert = [apple, kiwi, orange, banana];

// Method:1
// Without async-await
insertData(dataToInsert).then(() => {
  findData().then((data) => console.log("Fruits by Method 1", data));
});

//Method:2
//With async-await
const myFunction = async () => {
  await insertData(dataToInsert);
  const fruits = await findData();
  console.log("Fruits by Method 2", fruits);
};

myFunction();
