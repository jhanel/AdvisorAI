/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/


use('AdvisorAI');                 // select the database to use.

db.getCollection('Courses').insertMany([
  {
    "userId": 123,
    "exam": "Midterm Math",
    "assignment": "Math Homework 1",
    "quiz": "Math Quiz 1",
  },
  {
    "userId": 456,
    "exam": "Science Final",
    "assignment": "Lab 1",
    "quiz": "Science Quiz 1",
  }
]);

db.getCollection('Courses').find()    // verify that courses were inserted


// Schedules
/*db.getCollection('schedules').insertMany([

function genName(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

for (let i = 0; i < 2; i++) {
  let fname = genName(5);
  let lname = genName(10);
  let em = genName(7) + "@email.com";
  let pswd = genName(8);
  let maxid = db.collection.find().sort({age:-1}).limit(1).toArray();
  let userid = maxid.length > 0 ? parseInt(result[0].age) : 0;
  db.getCollection('users').insertOne(
    {
      "firstname" : fname,
      "lastname" : lname,
      "email" : em,
      "password" : pswd,
      "userID" : userid + 1
    }
  )
}

/*
db.getCollection('schedules').insertMany([

  {
    "userId": "12345",
    "schedule": [
      { "date": new Date("2025-03-10"), "subject": "Science", "hours": 3 },
      { "date": new Date("2025-03-11"), "subject": "English", "hours": 2 }
    ]
  },
  {
    "userId": "67890",
    "schedule": [
      { "date": new Date("2025-03-15"), "subject": "Math", "hours": 4 },
      { "date": new Date("2025-03-16"), "subject": "History", "hours": 1 }
    ]
  }
]);

const userSchedules = db.getCollection('schedules').find({
  userId: "12345"
}).toArray();

console.log("User 12345's schedule:", userSchedules);

db.getCollection('schedules').aggregate([
  { $unwind: "$schedule" },                 // total study hours for each subject

  { $group: { _id: "$schedule.subject", totalHours: { $sum: "$schedule.hours" } } }
]);
*/

/*
// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
*/