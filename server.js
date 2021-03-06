const mongoose = require("mongoose");

main().catch((err) => console.log(err));

// This section means connect to mongodb and create fruitsDB database inside that
async function main() {
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");
}

// ===============================
// Schema building
const fruitSchema = new mongoose.Schema({
  // Instead of writing just name: String, we use validator(s) here.
  name: {
    type: String,
    required: [true, 'No name is specified!']
  },

  // Instead of writing just rating: Number, we use validator(s) here.
  rating: {
    type: Number,
    min: 1,
    max: 10
  },

  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // relationship added in between peopleSchema and fruitSchema
  favoriteFruit: fruitSchema
});

const People = mongoose.model("People", peopleSchema);
// ===============================

// ===============================

// This deletes all names that is entered as John. I did not write
// async function here thatswhy it first deletes everything and then adds
// new data. So one line of peoples collection is seen in the end.
People.deleteMany({ name: 'John' }, (err) => {
  if(err){
    console.error(err);
  } else {
    console.log('Data deleted from people collection!');
  }
});

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

// Create People Object
const people = new People({
  name: "John",
  age: 37,
  favoriteFruit: apple
});

people.save();
// ===============================

// ===============================
// mongo operation functions

// Add 4 fruits. Apple, Kiwi, Orange and Banana.
const insertData = (dataToInsert) => {
  return new Promise((res, rej) => {
    Fruit.insertMany(dataToInsert, function (error) {
      if (error) {
        console.log(error);
        rej("Error");
      } else {
        console.log("New entries are added to the database!");
        res();
      }
    });
  });
};

// Update a name. Change name of Banana to Mongo.
const updateData = () => {
  return new Promise((res, rej) => {
    Fruit.updateOne({ name: 'Banana' }, { name: 'Mongo' }, err => {
      if(err){
        console.error(err);
        rej('Error');
      } else {
        console.log('Name Banana changed to Mongo!');
        res();
      }
    });
  });
};

// Delete a name. Delete Orange.
const deleteData = () => {
  return new Promise((res, rej) => {
    Fruit.deleteOne({ name: 'Orange' }, err => {
      if(err){
        console.error(err);
        rej('Error');
      } else {
        console.log('Name Orange deleted!');
        res();
      }
    });
  });
};

// Find the database entry.
const findData = () => {
  return new Promise((res, rej) => {
    Fruit.find(function (err, fruits) {
      if (err) {
        console.log(err);
        rej([]);
      } else {
        console.log('New entries found!');
        res(fruits);
      }
    });
  });
};

const dataToInsert = [apple, kiwi, orange, banana];

// Method:1
// Without async-await

//Comment this if you're using Method 2
// ====================================
// insertData(dataToInsert).then(() =>
//   findData()
//     .then((data) => console.log("Fruits by Method 1", data))
//     .catch((err) => console.error(err))
// );
// ====================================

//Method:2
//With async-await

//Comment this if you're using Method 1
// ====================================
const myFunction = async () => {
  try {
    await insertData(dataToInsert);
    await updateData();
    await deleteData();
    const fruits = await findData();

    console.log(fruits);

    fruits.forEach(fruit => {
      console.log(fruit.name);
    });

    mongoose.connection.close();
    
  } catch (error) {}
};

myFunction();