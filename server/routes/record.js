const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  console.log("in record.js route")
  console.log("here's the req: ")
  let db_connect = dbo.getDb("code");
  db_connect
    .collection("secondRun")
    .aggregate([
      {
        $search: {
          index: 'secondRun',
          compound: {
            must: [{
              text: {
                 "query": "linux",
                 "path": ["comment","title"]
              }
            }]
            }
        }
      },
      {$limit: 10}
    ])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


// custom query
recordRoutes.route("/query/").get(function (req, res) {
  console.log("in queryRoute")
  console.log(req.query.query)
  console.log(req.query.languages)
  let db_connect = dbo.getDb("code");
    let myLanguages = req.query.languages.split(" ")
    console.log("myLanguages: " + myLanguages.length)
    let mustSet = []
    let mustObj = {}
    mustObj.text = {"query":req.query.query,"path":["comment","title"]}
    mustSet.push(mustObj)
    let compoundObj = {}
    compoundObj.must = mustSet
    if(req.query.languages.length > 0) {
      console.log("put something here i guess")
      let mySet = []
      for(let i = 0; i < myLanguages.length - 1; i++) {
          let myObj = {}
          myObj.text = {"query":myLanguages[i],"path":"languages"}
          mySet.push(myObj);
      }
      compoundObj.should = mySet
      compoundObj.minimumShouldMatch = 1
    }
    db_connect
    .collection("secondRun")
    .aggregate([
      {
        $search: {
          index: 'secondRun',
          compound: compoundObj
        }
      },
      {$limit: 10}
    ])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  //}
});


// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("secondRun")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
  };
  db_connect.collection("secondRun").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();  
  let myquery = { _id: ObjectId( req.params.id )};  
  let newvalues = {    
    $set: {      
      name: req.body.name,     
      position: req.body.position,      
      level: req.body.level,
    }    
  }  
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("secondRun").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;