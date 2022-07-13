const express = require('express')
const connectDB = require('./config/connectDB')
const Person = require('./models/Person')

require('dotenv').config()

connectDB()
const app = express()


//Create Many Records with model.create()
const arrayOfPeople = async () => {
  try {
   const Persons=await Person.create([
      {
        name: "Maria",
        age: 26,
        favoriteFoods: ["kouskous", "salade"],
      },
      {
        name: "Alex",
        age: 29,
        favoriteFoods: ["spaguitie", "scalope"],
      },
      {
        name: "Julia",
        age: 25,
        favoriteFoods: ["rose", "fruits de mer"],
      },
      {
        name: "Amadou",
        age: 32,
        favoriteFoods: ["Pizza", "frit"],
      },
     
    ]);
    console.log(Persons);
  } catch (error) {
    console.log(error);
  }
};
arrayOfPeople()

//Use model.find() to Search Your Database -> [Person]
const find_allPeople = async (person_Name) => {
  try {
    const person_find = await Person.find({ name: person_Name });
    console.log("Search By Name", person_find);
  } catch (error) {
    console.log(error);
  }
};
find_allPeople("Amadou")

//Use model.findOne() to Return a Single Matching Document from Your Database (food)
const findOne_Person = (food) => {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) {
      console.log(err);
    }
    console.log(person);
  });
};
findOne_Person(["kouskous", "salade"])

//Use model.findById() (only!!) to Search Your Database By _id 
const Find_ById = (Id_person) => {
  Person.findById({ _id: Id_person }, (err, person) => {
    if (err) {
      console.log(err);
    }
    console.log(person);
  });
};
Find_ById('62cc7a31014a50667512c0b5')

//Perform Classic Updates by Running Find, Edit, then Save
const updates = (Id, food) => {
  Person.findById({ _id: Id }, (err, person) => {
    if (err) {
      console.log(err);
    } else {
      person.favoriteFoods.push(food);
      person.save();
      console.log(person);
    }
  });
};
updates('62cc7a31014a50667512c0b4',"hamburger")

//Perform New Updates on a Document Using model.findOneAndUpdate()
const new_updates = (personName, new_age) => {
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: new_age } },
    { new: true },
    (err, person) => {
      if (err) {
        console.log(err);
      } else console.log(person);
    }
  );
};
new_updates('Julia',25)

//Delete One Document Using model.findByIdAndRemove
const remove = (Id) => {
  Person.findByIdAndRemove({ _id: Id }, (err, person) => {
    if (err) {
      console.log(err);
    } else {
      console.log(person);
    }
  });
};
remove('62cc7a31014a50667512c0b5')

//MongoDB and Mongoose - Delete Many Documents with model.remove()
const delete_Many = (personName) => {
  Person.remove({ name: personName }, (err, person) => {
    err ? console.log(err) : console.log(person);
  });
};
delete_Many("Alex")

//Chain Search Query Helpers to Narrow Search Results
const Searchquery_Helpers = ( food )=>{
  Person.find({ favoriteFoods: food})
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((error, person)=> {
      error?
  console.log(error):
  console.log(person)
  });
  };
  Searchquery_Helpers("spaguitie")


const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
