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
recordRoutes.route("/admin/record/login").post(async function  (req, response) {
  try {
    let db_connect = dbo.getDb();
    const {email,password} = req.body;
    const users = await db_connect.collection("login").findOne({"email":email})
    if(!users){
      return response.status(404).json({error: 'No user found'});
    }
    if(password !== users.password){
      return response.status(401).json({error: 'Incorrect password'});
    }
    return response.json(true)
  } catch (e) {
    return response.status(500).json({error: 'Something went wrong'});
  }
}); 
// This section will help you get a list of all the records.
recordRoutes.route("/admin/record").get(function (req, res) {
  let db_connect = dbo.getDb("people");
  db_connect
    .collection("agents")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/admin/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("agents")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/admin/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    region: req.body.region,
    rating: +req.body.rating,
    fee: +req.body.fee,
    sales: +req.body.sales,
    manager: req.body.manager,
  };
  db_connect.collection("agents").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/admin/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      region: req.body.region,
      rating: req.body.rating,
      fee: req.body.fee,
      sales: req.body.sales,
      manager: req.body.manager,
      },
  };
  db_connect
    .collection("agents")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/admin/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("agents").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
