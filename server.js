const mongoose = require("mongoose");

main().catch((err) => console.log(err));

// This section means connect to mongodb and create fruitsDB database inside that
async function main() {
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");
}

// ===============================
// Schema building
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const People = mongoose.model("People", peopleSchema);
// ===============================

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

//Comment this if you're using Method 1
// ====================================
insertData(dataToInsert).then(() =>
  findData()
    .then((data) => console.log("Fruits by Method 1", data))
    .catch((err) => console.error(err))
);
// ====================================

//Method:2
//With async-await

//Comment this if you're using Method 1
// ====================================
const myFunction = async () => {
  try {
    await insertData(dataToInsert);
    const fruits = await findData();
    console.log("Fruits by Method 2", fruits);
  } catch (error) {}
};

myFunction();
// ====================================
